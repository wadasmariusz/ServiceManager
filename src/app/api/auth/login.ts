import axios, { AxiosResponse } from 'axios'
import * as yup from 'yup'
import { API_URL } from 'app/config/env'

export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email('Nieprawidłowy format adresu e-mail')
    .required('E-mail jest wymagany'),
  password: yup.string().required('Hasło jest wymagane'),
})

export type LoginFormFields = yup.InferType<typeof loginSchema>

export type LoginResponse = {
  userId: string | null
  email: string | null
  role: string | null
  state: string | null
  createdAt: string | null
  permissions: string[] | null
}

export const login = (
  data: LoginFormFields,
): Promise<AxiosResponse<LoginResponse>['data']> =>
  axios({
    method: 'POST',
    url: `${API_URL}/accounts/sign-in`,
    withCredentials: false,
    data,
  }).then(({ data }) => data)
