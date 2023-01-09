import { API_URL } from 'app/config/env'

import { usePaginatedQuery } from 'app/hooks'
import { ApiQueryParamsType } from 'app/types/server/Params'

import axios from 'axios'

export type TUserItem = {
  createdAt: string
  phoneNumber: string
  firstName: string
  lastName: string
  email: string
  role: string
  state: string
  userId: string
}

const getUsers = (queryKeyArgs: [], queryParams: ApiQueryParamsType) => {
  return axios({
    method: 'GET',
    url: `${API_URL}/users`,
    params: queryParams,
  }).then(({ data }) => data)
}

export const useGetUsers = () =>
  usePaginatedQuery<TUserItem>({
    queryKey: ['api.get.users'],
    queryFn: getUsers,
  })
