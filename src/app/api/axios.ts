import axios, { AxiosError, AxiosRequestConfig } from 'axios'
import { refreshToken } from './auth/refreshToken'

interface AxiosReqConfig extends AxiosRequestConfig {
  _retry?: boolean
}

export interface ApiErrorData {
  status: number
  title: string
  errors?: {
    [s: string]: string[]
  }
}

export const setupAxios = (accessToken: string | null) => {
  axios.interceptors.request.use(
    (config) => {
      if (accessToken) config.headers!.Authorization = `Bearer ${accessToken}`

      return config
    },
    (err) => Promise.reject(err),
  )

  axios.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
      const originalRequest = error.config as AxiosReqConfig
      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true
        try {
          const { accessToken: token } = await refreshToken()
          axios.defaults.headers.common.Authorization = `Bearer ${token}`
          return axios(originalRequest)
        } catch (e) {
          console.error(e)
        }
        return Promise.reject(error)
      }

      return Promise.reject(error)
    },
  )
}

export const revokeToken = () => {
  axios.interceptors.request.use(
    (config) => {
      config.headers!.Authorization = false
      return config
    },
    (err) => Promise.reject(err),
  )
}
