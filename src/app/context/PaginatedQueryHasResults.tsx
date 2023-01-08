import { useQueryContext } from './PaginatedQueryProvider'

type QueryHasResultsProps<T> = {
  children: ((data: T[]) => JSX.Element) | JSX.Element
}

export function PaginatedQueryHasResults<T>({
  children,
}: QueryHasResultsProps<T>) {
  const queryData = useQueryContext<T>()

  return (
    <>
      {queryData?.status === 'success' &&
      Array.isArray(queryData.data) &&
      queryData.data.length > 0
        ? typeof children === 'function'
          ? children(queryData?.data)
          : children
        : null}
    </>
  )
}
