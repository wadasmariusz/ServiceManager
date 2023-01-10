import * as yup from 'yup'
import axios, { AxiosResponse } from 'axios'
import { API_URL } from 'app/config/env'

export const addServiceSchema = yup.object().shape({
  name: yup.string().required('To pole jest wymagane.'),
  duration: yup
    .number()
    .required('To pole jest wymagane.')
    .typeError('To pole musi być liczbą'),
  description: yup.string().required('To pole jest wymagane.'),
  amount: yup
    .number()
    .required('To pole jest wymagane.')
    .typeError('To pole musi być liczbą'),
  currency: yup.string().required('To pole jest wymagane.').default('zł'),
})

export type AddServiceFormFields = yup.InferType<typeof addServiceSchema>

export type AddServiceResponse = {
  name: string
  duration: string
  description: string
  amount: string
  currency: string
}

export const postAddService = (
  data: AddServiceFormFields,
): Promise<AxiosResponse<AddServiceResponse>['data']> =>
  axios({
    method: 'POST',
    url: `${API_URL}/services`,
    data: data,
  }).then(({ data }) => data)
