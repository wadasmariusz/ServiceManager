import { ApiErrors } from 'components/common/api'
import { createContext, ReactNode, useContext } from 'react'
import { once } from 'lodash'
import { UsePaginatedQueryResult } from 'app/hooks'
import { ApiPagination } from 'components/common/api/ApiPagination'
import { SpinnerOverlay } from 'components/common/layout'

type ApiQueryResult<T> = Partial<UsePaginatedQueryResult<T>>

export type QueryContextValue<T = unknown> =
  | ApiQueryResult<T> & {
      children: ReactNode | ((data: T | T[] | undefined) => ReactNode) | null
    }

const createQueryContext = once(<T,>() =>
  createContext<QueryContextValue<T>>({
    children: null,
  }),
)
export const useQueryContext = <T,>() => useContext(createQueryContext<T>())

export function QueryProvider<T>(queryData: QueryContextValue<T>) {
  const QueryContext = createQueryContext<T>()

  return (
    <QueryContext.Provider value={queryData}>
      {queryData?.status !== 'success' && queryData?.isFetching ? (
        <SpinnerOverlay />
      ) : (
        <ApiErrors error={queryData?.error} />
      )}

      {queryData?.status === 'success' && (
        <>
          {typeof queryData.children === 'function'
            ? queryData.children(queryData?.data)
            : queryData.children}
        </>
      )}

      <ApiPagination />
    </QueryContext.Provider>
  )
}
