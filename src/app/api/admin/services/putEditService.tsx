import * as yup from 'yup'
import axios, { AxiosResponse } from 'axios'
import { API_URL } from 'app/config/env'

export const editServiceSchema = yup.object().shape({
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

export type EditServiceFormFields = yup.InferType<typeof editServiceSchema>

export type EditServiceResponse = {
  name: string
  duration: string
  description: string
  amount: string
  currency: string
}

//TO-DO: podpiąć odpowiednio do API
export const putEditService = (
  data: EditServiceFormFields,
): Promise<AxiosResponse<EditServiceResponse>['data']> =>
  axios({
    method: 'POST',
    url: `${API_URL}/services`,
    data: data,
  }).then(({ data }) => data)
