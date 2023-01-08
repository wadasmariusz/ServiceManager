import { useMemo } from 'react'

import {
  TApiRuntimeErrorData,
  TApiValidationErrorData,
  TApiErrors,
} from 'app/api/axios'

import { Alert } from '../mantine/Alert'
import { AlertProps } from '@mantine/core'

import { AxiosError } from 'axios'

export const isApiValidationError = (
  error: TApiErrors,
): error is AxiosError<TApiValidationErrorData> => {
  return (
    (error as AxiosError<TApiValidationErrorData>)?.response?.data?.status !==
      undefined &&
    (error as AxiosError<TApiValidationErrorData>)?.response?.data?.errors !==
      undefined
  )
}
export const isApiRuntimeError = (
  error: TApiErrors,
): error is AxiosError<TApiRuntimeErrorData> => {
  return (
    (error as AxiosError<TApiRuntimeErrorData>)?.response?.data?.errors[0]
      ?.code !== undefined
  )
}

type ApiErrorsProps = {
  error: TApiErrors
} & Partial<AlertProps>

const handleValidationError = (
  error: AxiosError<TApiValidationErrorData>,
): string => {
  let message = ''
  const errors = Object.entries(
    error.response?.data.errors as
      | { [s: string]: string[] }
      | ArrayLike<string[]>,
  )

  errors.forEach(([key, value]) => {
    message = message + key + ': ' + value + '\n'
  })
  return message
}

export const ApiErrors = ({ error, ...props }: ApiErrorsProps) => {
  if (!error) {
    return null
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
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
          return isApiRuntimeError(error)
            ? error?.response?.data?.errors[0]?.message
            : isApiValidationError(error)
            ? handleValidationError(error)
            : error.message
      }
    }
  }, [error])
  if (!errorMessage) return null
  if (error?.response?.status === 400 && isApiRuntimeError(error))
    return (
      <Alert
        color="red"
        variant="filled"
        sx={{ paddingTop: 8, paddingBottom: 8 }}
        {...props}
        styles={{ message: { whiteSpace: 'pre-line' } }}
      >
        {errorMessage}
      </Alert>
    )
  return (
    <Alert
      title="Error!"
      color="red"
      variant="filled"
      {...props}
      styles={{ message: { whiteSpace: 'pre-line' } }}
    >
      {errorMessage}
    </Alert>
  )
}
