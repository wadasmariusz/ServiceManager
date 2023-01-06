import { ReactNode } from 'react'
import { useQueryContext } from './QueryProvider'

interface QueryHasNoResultsProps<T> {
  children: ((data: T[]) => JSX.Element) | JSX.Element | ReactNode
}

export const QueryHasNoResults = <T,>({
  children,
}: QueryHasNoResultsProps<T>) => {
  const queryData = useQueryContext<T>()

  return (
    <>
      {queryData?.status === 'success' &&
      Array.isArray(queryData.data) &&
      queryData.data.length === 0
        ? typeof children === 'function'
          ? children(queryData?.data)
          : children
        : null}
    </>
  )
}
