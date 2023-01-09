import { API_URL } from 'app/config/env'
import axios, { AxiosResponse } from 'axios'

interface RefreshTokenReturnData {
  accessToken: string | null
  expires: number | null
  userId: number | null
  email: string | null
  roles: string[] | null
}

export const refreshToken = async (): Promise<
  AxiosResponse<RefreshTokenReturnData>['data']
> => {
  const res = await axios({
    method: 'POST',
    url: `${API_URL}/accounts/refresh-token`,
    withCredentials: true,
  })
  return await res.data
}
