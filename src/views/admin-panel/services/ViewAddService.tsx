import {
  addServiceSchema,
  AddServiceFormFields,
  AddServiceResponse,
  postAddService,
} from 'app/api/admin/services/postAddService'
import { TUseMutationErrors } from 'app/api/axios'
import { useFormMutation } from 'app/hooks'
import { routes } from 'app/router'
import { isApiRuntimeError } from 'components/common/api/ApiErrors'
import { CardForm } from 'components/common/cards/CardForm'
import { InputText } from 'components/common/inputs'
import { InputRichTextArea } from 'components/common/inputs/InputRichTextArea'

import { Breadcrumb } from 'components/common/layout'
import mantineNotification from 'components/common/mantine/notifications'
import { FormProvider } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

const breadcrumbItems = [
  { label: 'Usługi', url: routes['admin-panel.services'] },
  { label: 'Dodaj usługę', url: routes['admin-panel.services.add-service'] },
]

const ViewServices = () => {
  const navigate = useNavigate()
  const onSuccess = (data: AddServiceResponse) => {
    navigate(routes['admin-panel.service'])
    if (data)
      mantineNotification.success({ message: 'Nowa usługa została dodana' })
  }

  const onError = (error: TUseMutationErrors) => {
    if (isApiRuntimeError(error)) {
      mantineNotification.error({
        message: 'Błąd: ' + error?.response?.data?.errors[0]?.message,
      })
    }
  }

  const { methods, handleSubmit } = useFormMutation<
    AddServiceFormFields,
    AddServiceResponse
  >(addServiceSchema, postAddService, { onSuccess, onError })

  return (
    <>
      <Breadcrumb items={breadcrumbItems} />
      <FormProvider {...methods}>
        <CardForm
          title="Dodaj usługę"
          handleSubmit={handleSubmit}
          submitText="Dodaj"
        >
          <InputText name="name" label="Nazwa" />
          <InputText name="duration" label="Czas trwania(min)" />
          <InputText name="amount" label="Cena" />
          <InputText name="currency" label="Waluta" placeholder="zł" />
          <InputRichTextArea name="description" label="Opis" />
        </CardForm>
      </FormProvider>
    </>
  )
}

export default ViewServices
