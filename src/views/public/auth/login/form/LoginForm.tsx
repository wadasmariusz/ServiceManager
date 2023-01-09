import { useNavigate } from 'react-router-dom'

import { FormProvider } from 'react-hook-form'

import { useFormMutation } from 'app/hooks'

import { useActions } from 'app/hooks/useActions'
import { SetAuthStoreAction } from 'app/redux/actions'

import { login, LoginFormFields, LoginResponse, loginSchema } from 'app/api'
import { routes } from 'app/router'

import { MdOutlineAlternateEmail } from 'react-icons/md'

import { AuthFormWrapper } from './AuthFormWrapper'
import { AuthForm } from './AuthForm'
import { AuthFormLink } from './AuthFormLink'

import { ApiErrors } from 'components/common/api/ApiErrors'
import { InputPassword, InputText } from 'components/form/input'

export const LoginForm = () => {
  const navigate = useNavigate()
  const { _setAuthStore } = useActions()

  const setAuthStore = async (authData: SetAuthStoreAction['payload']) => {
    await _setAuthStore(authData)
  }

  const onSuccess = async (data: LoginResponse) => {
    await setAuthStore(data)
    navigate(routes['admin-panel'])
  }

  const { methods, handleSubmit, error } = useFormMutation<
    LoginFormFields,
    LoginResponse
  >(loginSchema, login, { onSuccess })

  return (
    <AuthFormWrapper>
      <FormProvider {...methods}>
        <AuthForm
          handleSubmit={handleSubmit}
          title="Witamy w aplikacji Pigener"
          description="Panel Administratora"
          inputSubmitText="Zaloguj"
        >
          <InputText
            required
            label="E-mail"
            name="email"
            icon={MdOutlineAlternateEmail}
          />

          <InputPassword required label="Hasło" name="password" />
          <ApiErrors error={error} />
        </AuthForm>
      </FormProvider>

      <AuthFormLink
        label="Zapomniałeś hasła?"
        to={routes['auth.register']}
        linkText="Zresetuj hasło."
        className="mt-2"
      />
    </AuthFormWrapper>
  )
}
