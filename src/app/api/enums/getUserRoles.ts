import { API_URL } from 'app/config/env'
import useQuery2 from 'app/hooks/api/useQuery2'
import axios from 'axios'

export interface UserRole {
  id: number
  name: string
  description?: string
}

const getUserRoles = () =>
  axios({
    method: 'GET',
    url: `${API_URL}/enums/user-role`,
  }).then(({ data }) => data)

export const useGetUserRoles = () =>
  useQuery2<UserRole[]>({
    queryKey: ['enums.userRoles'],
    queryFn: getUserRoles,
  })
