import { API_URL } from 'app/config/env'

import { useQuery2 } from 'app/hooks'

import axios from 'axios'

export type TUser = {
  createdAt: string
  phoneNumber: string
  firstName: string
  lastName: string
  email: string
  role: string
  state: string
  userId: string
  permissions: string[]
}

export const getUser = (userId: string | undefined) => {
  if (!userId) return Promise.reject(new Error('userId is undefined or null'))

  return axios({
    method: 'GET',
    url: `${API_URL}/users/${userId}`,
  }).then(({ data }) => data)
}

export const useGetUser = (userId?: string) =>
  useQuery2<TUser>({
    queryKey: ['api.get.user', userId],
    queryFn: getUser,
  })
