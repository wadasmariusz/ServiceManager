import { ApiErrorData } from 'app/api/axios'
import { AxiosError } from 'axios'
import {
  QueryKey,
  useQuery,
  UseQueryOptions,
  UseQueryResult,
} from 'react-query'

export type UseQuery2Params<T, Error> = {
  queryKey: QueryKey
  queryFn(queryKey: QueryKey[0]): Promise<T>
  config?: UseQueryOptions<T, Error>
}

export type UseQuery2Result<T> = Omit<
  UseQueryResult<T, AxiosError<ApiErrorData>>,
  'data'
> & {
  data?: T
}

export const useQuery2 = <T>({
  queryKey: _queryKey,
  queryFn,
  config,
}: UseQuery2Params<T, AxiosError<ApiErrorData>>): UseQuery2Result<T> => {
  const [, ...queryKey] = _queryKey

  const {
    data: queryData,
    isSuccess: _isSuccess,
    status,
    ...rest
  } = useQuery<T, AxiosError<ApiErrorData>>(
    _queryKey,
    () => queryFn(queryKey),
    config,
  )
  const data = status === 'success' ? queryData : undefined

  return {
    ...rest,
    status,
    isSuccess: _isSuccess && data !== undefined,
    data,
  }
}

export default useQuery2
