import { yupResolver } from '@hookform/resolvers/yup'
import { TApiValidationErrorData, TApiRuntimeErrorData } from 'app/api/axios'
import { AxiosError, AxiosResponse } from 'axios'
import { isApiValidationError } from 'components/common/api/ApiErrors'

import { Path, SubmitHandler, useForm } from 'react-hook-form'
import { useMutation, UseMutationOptions } from 'react-query'
import { AnyObjectSchema } from 'yup'

export const useFormMutation = <FormFields, ServerResponse>(
  schema: AnyObjectSchema,
  mutationFn: (
    data: FormFields,
  ) => Promise<AxiosResponse<ServerResponse>['data']>,
  options: Omit<
    UseMutationOptions<
      ServerResponse,
      AxiosError<TApiRuntimeErrorData> | AxiosError<TApiValidationErrorData>,
      FormFields,
      unknown
    >,
    'mutationFn'
  >,
  initial?: object,
) => {
  const methods = useForm<FormFields>({
    resolver: yupResolver(schema),
    defaultValues: { ...schema.getDefault(), ...initial },
  })

  const handleValidationError = (
    error: AxiosError<TApiValidationErrorData>,
  ) => {
    if (error.response?.status === 401) {
      methods.setError('status' as Path<FormFields>, {
        type: 'API',
        message: 'Brak uprawnień (401)',
      })
    } else if (error.response?.status === 403) {
      methods.setError('status' as Path<FormFields>, {
        type: 'API',
        message: 'Brak uprawnień (403)',
      })
    } else if (error.response?.status === 404) {
      methods.setError('status' as Path<FormFields>, {
        type: 'API',
        message: 'Nie znaleziono zasobu (404)',
      })
    } else if (error.response?.status === 405) {
      methods.setError('status' as Path<FormFields>, {
        type: 'API',
        message: 'Nieprawidłowa metoda (405)',
      })
    } else if (error.response?.status === 500) {
      methods.setError('status' as Path<FormFields>, {
        type: 'API',
        message: 'Wystąpił nieoczekiwany błąd. Spróbuj ponownie później (500)',
      })
    } else if (error.response?.data.errors) {
      const errors = Object.entries(
        error.response?.data.errors as
          | { [s: string]: string[] }
          | ArrayLike<string[]>,
      )

      errors.forEach(([key, value]) => {
        methods.setError(key.toLowerCase() as Path<FormFields>, {
          type: 'API',
          message: value[0],
        })
      })
    } else if (error.response?.data.title) {
      methods.setError('status' as Path<FormFields>, {
        type: 'API',
        message: error.response.data.title,
      })
    }
  }

  const { isLoading, mutateAsync, error } = useMutation(mutationFn, {
    ...options,
    onError: (
      error:
        | AxiosError<TApiValidationErrorData>
        | AxiosError<TApiRuntimeErrorData>,
      variables,
      context,
    ) => {
      if (isApiValidationError(error)) {
        handleValidationError(error)
      }

      if (options.onError) {
        options.onError(error, variables, context)
      }
    },
  })

  const inputsNames = inputsNamesFromSchema<FormFields>(schema)

  //const handleSubmit = methods.handleSubmit<FormFields>(((data: FormFields) =>
  const handleSubmit = methods.handleSubmit(((data: FormFields) =>
    mutateAsync(data)) as SubmitHandler<FormFields>)

  if (isApiValidationError(error)) {
    return { methods, handleSubmit, inputsNames, isLoading }
  }

  return { methods, handleSubmit, inputsNames, isLoading, error }
}

const inputsNamesFromSchema = <FormFields>(schema: AnyObjectSchema) => {
  //some magick :))
  type RemoveIndex<T> = {
    [P in keyof T as string extends P
      ? never
      : number extends P
      ? never
      : P]: T[P]
  }

  type SchemaKeys = keyof RemoveIndex<FormFields>
  type InputsNamesObject = Record<SchemaKeys, SchemaKeys>

  const inputsNames: InputsNamesObject = {} as InputsNamesObject

  Object.keys(schema.fields).map((value) => {
    const key = value as SchemaKeys
    inputsNames[key] = key
  })

  return inputsNames
}
