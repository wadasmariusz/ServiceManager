import { Checkbox } from '@mantine/core'
import {
  EditServiceFormFields,
  EditServiceResponse,
  editServiceSchema,
  putEditService,
} from 'app/api/admin/services/putEditService'
import { TUseMutationErrors } from 'app/api/axios'
import { useFormMutation } from 'app/hooks'
import { routes } from 'app/router'
import { isApiRuntimeError } from 'components/common'
import mantineNotification from 'components/common/mantine/notifications'
import { FormProvider } from 'react-hook-form'
import { useNavigate } from 'react-router'

const AccessibilityForm = () => {
  const navigate = useNavigate()
  const onSuccess = (data: EditServiceResponse) => {
    // navigate(routes['admin-panel.service'](serviceId))
    navigate(routes['admin-panel.service'])

    if (data)
      mantineNotification.success({
        message: 'Usługa została pomyślnie edytowana',
      })
  }

  const onError = (error: TUseMutationErrors) => {
    if (isApiRuntimeError(error)) {
      mantineNotification.error({
        message: 'Błąd: ' + error?.response?.data?.errors[0]?.message,
      })
    }
  }

  const { methods, handleSubmit } = useFormMutation<
    EditServiceFormFields,
    EditServiceResponse
  >(editServiceSchema, putEditService, { onSuccess, onError })
  return (
    <FormProvider {...methods}>
      <Checkbox name="monday" />
    </FormProvider>
  )
}

export default AccessibilityForm
