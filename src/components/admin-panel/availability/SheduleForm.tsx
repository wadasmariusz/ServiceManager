import { Stack } from '@mantine/core'
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
import { Button } from 'components/common/mantine/Button'
import mantineNotification from 'components/common/mantine/notifications'
import dayjs from 'dayjs'
import { FormProvider, useFieldArray, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router'
import DateFromToPicker from './inputs/DateFromToPicker'

const defaultValues = {
  availabilityHours: [
    {
      from: dayjs().startOf('day').add(9, 'hour').toISOString(),
      to: dayjs().startOf('day').add(17, 'hour').toISOString(),
    },
  ],
}

const SheduleForm = () => {
  // const navigate = useNavigate()
  // const onSuccess = (data: EditServiceResponse) => {
  //   // navigate(routes['admin-panel.service'](serviceId))
  //   navigate(routes['admin-panel.service'])

  //   if (data)
  //     mantineNotification.success({
  //       message: 'Usługa została pomyślnie edytowana',
  //     })
  // }

  // const onError = (error: TUseMutationErrors) => {
  //   if (isApiRuntimeError(error)) {
  //     mantineNotification.error({
  //       message: 'Błąd: ' + error?.response?.data?.errors[0]?.message,
  //     })
  //   }
  // }
  // const { methods, handleSubmit } = useFormMutation<
  //   EditServiceFormFields,
  //   EditServiceResponse
  // >(editServiceSchema, putEditService, { onSuccess, onError })

  const methods = useForm({ defaultValues: defaultValues })

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit((data: any) => {
          console.log(data)
        })}
        className={'w-full'}
      >
        <Stack className="w-full bg-white" align="center">
          <DateFromToPicker />
          <Button type="submit">Zatwierdź daty</Button>
        </Stack>
      </form>
    </FormProvider>
  )
}

export default SheduleForm
