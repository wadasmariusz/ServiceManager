import { SEARCH } from 'app/config/api/queryParams'

import { createStyles } from '@mantine/core'

import { FiltersWrapper } from 'components/common/cards/CardFilters'
import { InputText } from 'components/common/inputs'

import { HiOutlineSearch } from 'react-icons/hi'

const useStyles = createStyles(() => ({
  form: {
    width: '100%',
  },
  input: {
    border: 0,
    borderRadius: 10,
  },
}))

export const SearchFilters = () => {
  const { classes } = useStyles()

  return (
    <FiltersWrapper
      withDefaultFormStyles={false}
      formClassName={classes.form}
      filtersKeys={[SEARCH]}
    >
      <InputText
        name={SEARCH}
        icon={HiOutlineSearch}
        placeholder={'Szukaj'}
        size={'lg'}
        classNames={{ input: classes.input }}
      />
    </FiltersWrapper>
  )
}
