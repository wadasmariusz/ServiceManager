import React from 'react'
import { useMemo, forwardRef } from 'react'
import { QueryKey } from 'react-query'
import { useQuery2 } from 'app/hooks'

import { convertDataToSelectItems } from 'app/utils/convertDataToSelectItems'

import { Loader } from '@mantine/core'
import { InputSelect, InputSelectProps } from './InputSelect'
import { ApiEnumType } from 'app/types/server/ApiCommonTypes'

type InputAsyncSelectProps = {
  queryKey: QueryKey
  queryFn(queryKey: QueryKey): Promise<ApiEnumType[]>
} & Omit<InputSelectProps, 'data'>

export const InputSelectAsync = ({
  queryFn,
  queryKey,
  ...props
}: InputAsyncSelectProps) => {
  const { data, isSuccess, isFetching } = useQuery2({
    queryKey,
    queryFn,
  })

  const selectItems = useMemo(
    () => (data && isSuccess ? convertDataToSelectItems(data) : []),
    [data, isSuccess],
  )

  if (isFetching)
    return (
      <InputSelect
        data={[{ value: '', label: 'Ładowanie', disabled: true }]}
        itemComponent={LoadingSelectItem}
        {...props}
      />
    )

  return (
    <InputSelect
      data={
        selectItems.length
          ? selectItems
          : [{ value: '', label: 'Brak rekordów', disabled: true }]
      }
      classNames={selectItems.length ? {} : { item: 'text-center' }}
      {...props}
    />
  )
}

type ItemProps = {
  label: string
} & React.ComponentPropsWithoutRef<'div'>

// eslint-disable-next-line react/display-name
const LoadingSelectItem = forwardRef<HTMLDivElement, ItemProps>(
  ({ label, ...props }, ref) => (
    <div ref={ref} {...props}>
      <div className="flex items-center justify-center gap-x-2">
        <Loader color="gray" size="xs" />
        {label}
      </div>
    </div>
  ),
)
