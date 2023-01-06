import { FormProvider } from 'react-hook-form'
import { MdOutlineAlternateEmail, ImCross } from 'react-icons/all'
import { Group, Stack } from '@mantine/core'
import { InputPassword, InputSubmit, InputText } from 'components/form/input'
import { useLocation, useNavigate } from 'react-router-dom'
import { r } from 'app/router'
import { showNotification } from '@mantine/notifications'
import { AxiosError } from 'axios'
import { HookFormError } from 'components/form/helpers/HookFormError'
import { ApiErrorData } from 'app/api/axios'
import { useAuth } from 'app/store'
import { useFormMutation } from 'app/hooks'
import { login, LoginFormFields, LoginResponse, loginSchema } from 'app/api'
import { LocationState } from 'components/common'

export const FormLogin = () => {
  const navigate = useNavigate()
  const setAuthState = useAuth((state) => state.setAuthState)
  const { state } = useLocation()
  const routeBack = (state as LocationState)?.from?.pathname

  const onSuccess = (data: LoginResponse) => {
    setAuthState(data)
    navigate(routeBack || r['index'])
  }

  const onError = (error: AxiosError<ApiErrorData>) => {
    showNotification({
      title: 'Wystąpił błąd',
      message: error.response?.data.title,
      color: 'red',
      icon: <ImCross />,
    })
  }

  const { methods, handleSubmit } = useFormMutation<
    LoginFormFields,
    LoginResponse
  >(loginSchema, login, { onSuccess, onError })

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit}>
        <HookFormError />
        <Stack>
          <InputText
            required
            label="Email"
            name="email"
            icon={MdOutlineAlternateEmail}
          />

          <InputPassword required label="Hasło" name="password" />
        </Stack>
        <Group mt={'lg'} position="right" grow>
          <InputSubmit value="Zaloguj się" mt={'md'} />
        </Group>
      </form>
    </FormProvider>
  )
}
