import { yupResolver } from '@hookform/resolvers/yup'
import { ApiErrorData } from 'app/api/axios'
import { AxiosError, AxiosResponse } from 'axios'
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
      AxiosError<ApiErrorData>,
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

  const handleError = (error: AxiosError<ApiErrorData>) => {
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

  const { isLoading, mutateAsync } = useMutation(mutationFn, {
    ...options,
    onError: (error: AxiosError<ApiErrorData>, variables, context) => {
      handleError(error)
      if (options.onError) {
        options.onError(error, variables, context)
      }
    },
  })

  const handleSubmit = methods.handleSubmit<FormFields>(((data: FormFields) =>
    mutateAsync(data)) as SubmitHandler<FormFields>)

  return { methods, handleSubmit, isLoading }
}
