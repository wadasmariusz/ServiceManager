import { useQueryContext } from './QueryProvider'

interface QueryIsSuccessProps<T> {
  children: (data: T | T[] | undefined) => JSX.Element | JSX.Element
}

export const QueryIsSuccess = <T,>({ children }: QueryIsSuccessProps<T>) => {
  const queryData = useQueryContext<T>()

  return (
    <>
      {queryData?.status === 'success'
        ? typeof children === 'function'
          ? children(queryData?.data)
          : children
        : null}
    </>
  )
}
