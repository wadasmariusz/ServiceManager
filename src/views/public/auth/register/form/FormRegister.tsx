import { FormProvider } from 'react-hook-form'
import { MdOutlineAlternateEmail, ImCross } from 'react-icons/all'
import { Group, Stack } from '@mantine/core'
import { InputPassword, InputSubmit, InputText } from 'components/form/input'
import { useNavigate } from 'react-router-dom'
import { routes } from 'app/router'
import { showNotification } from '@mantine/notifications'
import { AxiosError, AxiosResponse } from 'axios'
import { HookFormError } from 'components/form/helpers/HookFormError'
import { register, RegisterFormFields, registerSchema } from 'app/api'
import { ApiErrorData } from 'app/api/axios'
import { useFormMutation } from 'app/hooks'

const passwordRequirements = [
  { re: /^[\w\W]{6,}$/, label: 'Zawiera minimum 6 znaków' },
  { re: /[0-9]/, label: 'Zawiera liczbę' },
  { re: /[a-z]/, label: 'Zawiera małą literę' },
  { re: /[A-Z]/, label: 'Zawiera dużą literę' },
  { re: /[$&+,:;=?@#|'<>.^*()%!-]/, label: 'Zawiera symbol specjalny' },
]

export const FormRegister = () => {
  const navigate = useNavigate()

  const onSuccess = () => {
    navigate(routes['auth.login'])
  }

  const onError = (err: AxiosError<ApiErrorData>) => {
    showNotification({
      title: 'Wystąpił błąd',
      message: err.response?.data.title,
      color: 'red',
      icon: <ImCross />,
    })
  }

  const { methods, handleSubmit } = useFormMutation<
    RegisterFormFields,
    AxiosResponse
  >(registerSchema, register, {
    onSuccess,
    onError,
  })

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit} autoComplete="off">
        <HookFormError />
        <Stack>
          <InputText
            required
            label="Email"
            name="email"
            icon={MdOutlineAlternateEmail}
          />

          <InputPassword
            required
            label="Hasło"
            name="password"
            requirements={passwordRequirements}
          />
          <InputPassword required label="Hasło" name="confirmPassword" />
        </Stack>
        <Group mt={'lg'} position="right" grow>
          <InputSubmit value="Zarejestruj się" mt={'md'} />
        </Group>
      </form>
    </FormProvider>
  )
}
