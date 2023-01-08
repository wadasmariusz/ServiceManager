import { once } from 'lodash'
import { createContext, ReactNode, useContext } from 'react'
import { UseQuery2Result } from 'app/hooks'
import { ApiErrors } from 'components/common/api/ApiErrors'

import { AppBarLoader } from 'components/common/special/AppBarLoader'

type ApiQueryResult<T> = Partial<UseQuery2Result<T>>

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
      {queryData?.isFetching ? <AppBarLoader /> : null}

      {queryData?.status !== 'success' && queryData?.isFetching ? (
        <AppBarLoader />
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
    </QueryContext.Provider>
  )
}
