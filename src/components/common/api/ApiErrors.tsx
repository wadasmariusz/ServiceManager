import { Alert } from '@mantine/core'
import { ApiErrorData } from 'app/api/axios'
import { AxiosError } from 'axios'
import { useMemo } from 'react'

interface ApiErrorsProps {
  error: AxiosError<ApiErrorData> | AxiosError<ApiErrorData> | null | undefined
}

export const ApiErrors = ({ error }: ApiErrorsProps) => {
  const errorMessage = useMemo(() => {
    if (error) {
      switch (error?.response?.status) {
        case 401:
          return 'Brak dostępu do zasobu (Błąd 401)'
        case 403:
          return 'Brak uprawnień do zasobu (Błąd 403)'
        case 404:
          return 'Nie znaleziono zasobu (Błąd 404)'
        case 500:
          return 'Wystąpił nieoczekiwany błąd. Spróbuj ponownie później'
        default:
          return error.message
      }
    }
  }, [error])

  if (!error) return null

  return (
    <Alert title="Error!" color="red" variant="filled">
      {errorMessage}
    </Alert>
  )
}
