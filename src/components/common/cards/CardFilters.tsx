import { useSearchParams } from 'react-router-dom'
import { FormProvider, useForm } from 'react-hook-form'

import { createStyles } from '@mantine/core'
import { PAGE } from 'app/config/api/queryParams'

import { Card, CardProps } from './Card'
import { AutoSubmit } from '../inputs/AutoSubmit'

const useStyles = createStyles(() => ({
  defaultFormStyles: {
    width: '100%',
    display: 'flex',
    flexWrap: 'wrap',
    rowGap: 16,
    columnGap: 16,
  },
}))

type FiltersFields = Record<string, string>
//type FiltersFields<TFiltersNames> = Record<TFiltersNames, string>

type useFormFiltersConfig = {
  //set filters to URL from filtersForm data object only
  onlyFormFieldsFilters?: boolean
  //this object defines parserFunction for provided filter keys
  filtersParser?: Record<string, (value: unknown) => string>
  //determine whether append pagination filters or not
  withoutPaginationFilters?: boolean
}

const useFormFiltersDefaultConfig: useFormFiltersConfig = {
  onlyFormFieldsFilters: false,
  filtersParser: undefined,
  withoutPaginationFilters: false,
}

export const useFormFilters = (
  config = useFormFiltersDefaultConfig,
  filtersKeys: string[],
) => {
  //type FiltersFields = Record<TFiltersNames, string>
  const [params, setQueryParams] = useSearchParams()
  const queryParams = Object.fromEntries(params.entries())

  //remove searchParams which don't belong to filters form
  for (const [key] of Object.entries(queryParams)) {
    if (!filtersKeys.includes(key)) delete queryParams[key]
  }

  const methods = useForm<FiltersFields>({
    defaultValues: queryParams,
  })

  const submitFilters = methods.handleSubmit((data: FiltersFields) => {
    //get all url queryParams which might not be included in filters form like: Page, PerPage
    const queryParams = Object.fromEntries(params.entries())

    //remove empty filters from url and empty form data fields
    for (const [key, value] of Object.entries(data)) {
      if (value === undefined || value === null || value === '')
        delete data[key as keyof FiltersFields]
      delete queryParams[key]
    }

    // USE-FORM-FILTERS-CONFIGS
    //set current queryParams and queryParams from filters form according to config object

    //TODO: good idea, but how to connect parsedParams config to other configs ?
    //parse filters first and then join them to URL
    const parsedParams: Record<string, string> = {}
    if (config.filtersParser) {
      for (const [key, value] of Object.entries(data)) {
        if (config.filtersParser[key]) {
          parsedParams[key] = config.filtersParser[key](value)
        }
      }
    }

    if (config.withoutPaginationFilters) {
      if (config.onlyFormFieldsFilters)
        setQueryParams({ ...data, ...parsedParams })
      else setQueryParams({ ...queryParams, ...data, ...parsedParams })
    } else {
      if (config.onlyFormFieldsFilters)
        setQueryParams({ ...data, ...parsedParams, [PAGE]: '1' })
      else
        setQueryParams({
          ...queryParams,
          ...data,
          ...parsedParams,
          [PAGE]: '1',
        })
    }
  })

  return { methods, submitFilters }
}

type FiltersWrapperProps = {
  children: React.ReactNode
  filtersKeys: string[] //TODO: change to required prop
  formClassName?: string
  withDefaultFormStyles?: boolean
  filtersConfig?: useFormFiltersConfig
}

export const FiltersWrapper = ({
  children,
  formClassName = '',
  withDefaultFormStyles = true,
  filtersConfig,
  filtersKeys,
}: FiltersWrapperProps) => {
  const { classes, cx } = useStyles()
  const { methods, submitFilters } = useFormFilters(filtersConfig, filtersKeys)

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={submitFilters}
        className={cx(
          {
            [classes.defaultFormStyles]:
              withDefaultFormStyles && !formClassName,
          },
          { [formClassName]: formClassName },
        )}
      >
        {children}
        <AutoSubmit />
      </form>
    </FormProvider>
  )
}

type CardFiltersProps = CardProps &
  Pick<FiltersWrapperProps, 'filtersConfig' | 'filtersKeys'>

export const CardFilters = ({
  children,
  className = '',
  filtersConfig,
  filtersKeys,
  ...props
}: CardFiltersProps) => {
  return (
    <Card
      className={`mb-8 ${className}`}
      sx={{ overflow: 'visible' }}
      {...props}
    >
      <FiltersWrapper filtersConfig={filtersConfig} filtersKeys={filtersKeys}>
        {children}
      </FiltersWrapper>
    </Card>
  )
}
