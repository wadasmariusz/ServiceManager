import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'

export const useNavigateSearch = () => {
  const { search } = useLocation()
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()

  return (to: string, searchParamsKeys?: string[]) => {
    if (searchParamsKeys) {
      let specifiedSearchParams = '?'
      searchParamsKeys.forEach((key) => {
        const value = searchParams.get(key)
        if (value) specifiedSearchParams += `${key}=${value}&`
      })

      navigate(to + specifiedSearchParams.slice(0, -1))
    } else {
      navigate(to + search)
    }
  }
}
