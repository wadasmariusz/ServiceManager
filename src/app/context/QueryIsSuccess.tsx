import { useQueryContext } from './QueryProvider'

type QueryIsSuccessProps<T> = {
  children:
    | ((data: T | undefined) => JSX.Element | JSX.Element[] | null)
    | React.ReactNode
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
