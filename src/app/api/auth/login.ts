import axios, { AxiosResponse } from 'axios'
import * as yup from 'yup'
import { API_URL } from 'app/config/env'

export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email('Nieprawidłowy format adresu email')
    .required('Email jest wymagany'),
  password: yup.string().required('Hasło jest wymagane'),
})

export interface LoginFormFields extends yup.InferType<typeof loginSchema> {}

export interface LoginResponse {
  accessToken: string | null
  expires: number | null
  userId: number | null
  email: string | null
  roles: string[] | null
}

export const login = (
  data: LoginFormFields,
): Promise<AxiosResponse<LoginResponse>['data']> =>
  axios({ method: 'POST', url: `${API_URL}/account/sign-in`, data }).then(
    ({ data }) => data,
  )
