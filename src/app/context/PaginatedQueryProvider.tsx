import { once } from 'lodash'
import { createContext, ReactNode, useContext } from 'react'
import { UsePaginatedQueryResult } from 'app/hooks'
import { ApiErrors } from 'components/common/api/ApiErrors'
import { ApiPagination } from 'components/common/api/ApiPagination'
import { AppBarLoader } from 'components/common/special/AppBarLoader'
//import { Loader } from "@mantine/core";

type ApiQueryResult<T> = Partial<UsePaginatedQueryResult<T>>

export type QueryContextValue<T = unknown> = ApiQueryResult<T> & {
  children: ReactNode | ((data: T | T[] | undefined) => ReactNode) | null
  //additional configs:
  withDefaultPagination?: boolean
}

const createQueryContext = once(<T,>() =>
  createContext<QueryContextValue<T>>({
    children: null,
  }),
)

export const useQueryContext = <T,>() => useContext(createQueryContext<T>())

// TODO: add withDefaultPagination prop
// type PaginatedQueryProviderProps<T> = {
//   queryData: QueryContextValue<T>;
//   withDefaultPagination?: boolean;
// }

// export const PaginatedQueryProvider = <T,>({
//   queryData,
//   withDefaultPagination=true
// }:PaginatedQueryProviderProps<T>) => {

export const PaginatedQueryProvider = <T,>(queryData: QueryContextValue<T>) => {
  const QueryContext = createQueryContext<T>()

  return (
    <QueryContext.Provider value={queryData}>
      {queryData?.isFetching ? <AppBarLoader /> : null}

      {queryData?.status !== 'success' && queryData?.isFetching ? (
        <AppBarLoader />
      ) : (
        <ApiErrors error={queryData?.error} />
      )}

      {/* TODO: default paginated query has no results componet*/}
      {/* <PaginatedQueryHasNoResults /> */}

      {queryData?.status === 'success' && (
        <>
          {typeof queryData.children === 'function'
            ? queryData.children(queryData?.data)
            : queryData.children}
        </>
      )}

      {queryData?.withDefaultPagination === false ? null : <ApiPagination />}
    </QueryContext.Provider>
  )
}
