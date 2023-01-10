import { API_TEMPORARY_URL } from 'app/config/env'

import { usePaginatedQuery } from 'app/hooks'
import { ApiQueryParamsType } from 'app/types/server/Params'

import axios from 'axios'

export type TServiceItem = {
  serviceId: string
  name: string
  duration: string
  description: string
  amount: string
  currency: string
  dietitian: string
}

const getServices = (queryKeyArgs: [], queryParams: ApiQueryParamsType) => {
  return axios({
    method: 'GET',
    url: `${API_TEMPORARY_URL}/Services`,
    params: queryParams,
  }).then(({ data }) => data)
}

export const useGetServices = () =>
  usePaginatedQuery<TServiceItem>({
    queryKey: ['api.get.services'],
    queryFn: getServices,
  })
