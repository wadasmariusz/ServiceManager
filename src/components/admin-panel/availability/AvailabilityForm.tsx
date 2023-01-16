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
import TimeFromToPicker from './inputs/TimeFromToPicker'

const AvailabilityForm = () => {
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
  const methods = useForm({
    defaultValues: {
      monday: {
        availabilityHours: [
          {
            from: dayjs('2023-01-01T08:00:00.000Z').toDate(),
            to: dayjs('2023-01-01T16:00:00.000Z').toDate(),
          },
        ],
        isAvailable: false,
      },
      tuesday: {
        availabilityHours: [
          {
            from: dayjs('2023-01-01T08:00:00.000Z').toDate(),
            to: dayjs('2023-01-01T16:00:00.000Z').toDate(),
          },
        ],
        isAvailable: false,
      },
      wednesday: {
        availabilityHours: [
          {
            from: dayjs('2023-01-01T08:00:00.000Z').toDate(),
            to: dayjs('2023-01-01T16:00:00.000Z').toDate(),
          },
        ],
        isAvailable: false,
      },
      thursday: {
        availabilityHours: [
          {
            from: dayjs('2023-01-01T08:00:00.000Z').toDate(),
            to: dayjs('2023-01-01T16:00:00.000Z').toDate(),
          },
        ],
        isAvailable: false,
      },
      friday: {
        availabilityHours: [
          {
            from: dayjs('2023-01-01T08:00:00.000Z').toDate(),
            to: dayjs('2023-01-01T16:00:00.000Z').toDate(),
          },
        ],
        isAvailable: false,
      },
    },
  })
  //TO-DO:
  // Przy wysyłaniu zrobić do isavailable podwójną negację żeby zamieniało undefined na false
  // Przy wysyłaniu zmienić format daty na ISOString

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit((data: any) => {
          console.log(data)
        })}
        className={'w-full'}
      >
        <Stack className="w-full bg-white" align="center">
          <TimeFromToPicker
            name="monday"
            hasCopyFn
            fieldsToPasteInto={['tuesday', 'wednesday', 'thursday', 'friday']}
            checkboxLabel="Poniedziałek"
          />
          <TimeFromToPicker name="tuesday" checkboxLabel="Wtorek" />
          <TimeFromToPicker name="wednesday" checkboxLabel="Środa" />
          <TimeFromToPicker name="thursday" checkboxLabel="Czwartek" />
          <TimeFromToPicker name="friday" checkboxLabel="Piątek" />
          <Button type="submit">Zatwierdź godziny</Button>
        </Stack>
      </form>
    </FormProvider>
  )
}

export default AvailabilityForm
