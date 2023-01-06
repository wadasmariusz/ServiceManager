import { API_URL } from 'app/config/env'
import { usePaginatedQuery } from 'app/hooks'
import axios from 'axios'

export interface Report {
  id: number
  title: string
  description: string
  reportDate: string
  user: {
    id: number
    firstName: string
    lastName: string
    roles: string[]
    phoneNumber: string
    email: string
  }
  reportStatus: {
    id: number
    name: string
  }
  localization: {
    lat: number
    lng: number
  }
  photoUrlList: {
    id: number
    url: string
  }[]

  isRaised: true
  isServed: true
  commentsAmount: number
  raisesAmount: number
  reportType: {
    id: number
    name: string
  }
  address: {
    street: string
    postalCode: string
    city: string
    houseNumber: string
  }
}

const getReports = (
  _: number | string,
  params: Record<string, string | number>,
) =>
  axios({
    method: 'GET',
    url: `${API_URL}/admin/reports`,
    params,
  }).then(({ data }) => data)

export const useGetReports = () =>
  usePaginatedQuery<Report>({
    queryKey: ['app.reports'],
    queryFn: getReports,
  })
