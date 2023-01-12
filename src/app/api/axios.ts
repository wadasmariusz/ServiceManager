import axios, { AxiosError } from 'axios'
import { API_BEARER_TOKEN } from 'app/config/env'

axios.defaults.headers.common = { Authorization: `bearer ${API_BEARER_TOKEN}` }
axios.defaults.baseURL = 'http://localhost:3000/'

export type TApiGetErrorData = {
  status: number
  title: string
  traceId: string
  type: string
}

export type TApiValidationErrorData = {
  status: number
  title: string
  traceId: string
  type: string
  errors?: {
    [s: string]: string[]
  }
}

export type TApiRuntimeErrorData = {
  errors: { code: string; message: string }[]
}

export type TUseQueryErrors =
  | AxiosError<TApiGetErrorData>
  | AxiosError<''>
  | AxiosError<TApiValidationErrorData>
  | null
  | undefined
export type TUseMutationErrors =
  | AxiosError<TApiValidationErrorData>
  | AxiosError<TApiRuntimeErrorData>
  | null
  | undefined
export type TApiErrors = TUseQueryErrors | TUseMutationErrors
export const setupAxios = () => {
  axios.interceptors.request.use(
    (config) => {
      config.withCredentials = true

      return config
    },
    (err) => Promise.reject(err),
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
