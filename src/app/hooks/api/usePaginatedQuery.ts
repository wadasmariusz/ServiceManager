import { ApiPaginatedResponse, Pagination } from 'app/types'
import { ApiErrorData } from 'app/api/axios'
import { AxiosError } from 'axios'
import {
  QueryKey,
  useQuery,
  UseQueryOptions,
  UseQueryResult,
} from 'react-query'
import { useSearchParams } from 'react-router-dom'

export type UsePaginatedQueryParams<T, Error> = {
  queryKey: QueryKey
  queryFn(
    queryKey: QueryKey[0],
    params: Record<string, string | number>,
  ): Promise<ApiPaginatedResponse<T>>
  config?: UseQueryOptions<ApiPaginatedResponse<T>, Error>
  defaultPageSize?: number
  defaultPage?: number
  page?: number
  perPage?: number
}

export type UsePaginatedQueryResult<T> = Omit<
  UseQueryResult<ApiPaginatedResponse<T>, AxiosError<ApiErrorData>>,
  'data'
> & {
  data?: T[]
  pagination: Pagination
}

export const usePaginatedQuery = <T>({
  queryKey: _queryKey,
  queryFn,
  config,
  defaultPageSize = 25,
  defaultPage = 1,
  page: passedPage,
  perPage: passedPerPage,
}: UsePaginatedQueryParams<
  T,
  AxiosError<ApiErrorData>
>): UsePaginatedQueryResult<T> => {
  const [searchParams] = useSearchParams()
  const params = Object.fromEntries(searchParams)

  const page = passedPage ?? searchParams.get('pageNumber') ?? defaultPage
  const perPage =
    passedPerPage ?? searchParams.get('pageSize') ?? defaultPageSize

  const [, ...queryKey] = _queryKey

  const queryData = useQuery<ApiPaginatedResponse<T>, AxiosError<ApiErrorData>>(
    [..._queryKey, { ...params, page, perPage }],
    () => queryFn(queryKey, { pageNumber: page, pageSize: perPage, ...params }),
    { ...config, keepPreviousData: true },
  )

  return {
    ...queryData,
    data: queryData.data?.items,
    pagination: {
      pageIndex: queryData.data?.pageIndex,
      totalPages: queryData.data?.totalPages,
      totalCount: queryData.data?.totalCount,
      hasPreviousPage: queryData.data?.hasPreviousPage,
      hasNextPage: queryData.data?.hasNextPage,
    },
  }
}
