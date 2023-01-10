import {
  editServiceSchema,
  EditServiceFormFields,
  EditServiceResponse,
  putEditService,
} from 'app/api/admin/services/putEditService'
import { TUseMutationErrors } from 'app/api/axios'
import { useFormMutation } from 'app/hooks'
import { routes } from 'app/router'
import { isApiRuntimeError } from 'components/common/api/ApiErrors'
import { CardForm } from 'components/common/cards/CardForm'
import { InputText } from 'components/common/inputs'
import { InputTextArea } from 'components/common/inputs/InputTextArea'

import { Breadcrumb } from 'components/common/layout'
import mantineNotification from 'components/common/mantine/notifications'
import { FormProvider } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

const breadcrumbItems = [
  { label: 'Usługi', url: routes['admin-panel.services'] },
  //   { label: `${serviceId}`, url: routes['admin-panel.service']() },
  { label: 'serviceId', url: routes['admin-panel.service'] },
  //   { label: 'Edytuj usługę', url: routes['admin-panel.services.edit-service'] ()},
  {
    label: 'Edytuj usługę',
    url: routes['admin-panel.services.edit-service'],
  },
]

const ViewEditService = () => {
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
        message: error?.response?.data?.errors[0]?.message,
      })
    }
  }

  const { methods, handleSubmit } = useFormMutation<
    EditServiceFormFields,
    EditServiceResponse
  >(editServiceSchema, putEditService, { onSuccess, onError })

  return (
    <>
      <Breadcrumb items={breadcrumbItems} />
      <FormProvider {...methods}>
        <CardForm
          title="Edytuj usługę"
          handleSubmit={handleSubmit}
          submitText="Edytuj"
        >
          <InputText name="name" label="Nazwa" />
          <InputText name="duration" label="Czas trwania(min)" />
          <InputText name="amount" label="Cena" />
          <InputText name="currency" label="Waluta" placeholder="zł" />
          <InputTextArea name="description" label="Opis" />
        </CardForm>
      </FormProvider>
    </>
  )
}

export default ViewEditService
