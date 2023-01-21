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
import { FormProvider, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router'
import TimeFromToPicker from './inputs/TimeFromToPicker'

type FromTo = {
  from: Date
  to: Date
}

type Availability = {
  availabilityHours: FromTo[]
  isAvailable: boolean
}

const weekdays = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday']
const from = dayjs().startOf('day').add(9, 'hour').toDate()
const to = dayjs().startOf('day').add(17, 'hour').toDate()

type Weekday = typeof weekdays[number]

const initialValues = weekdays.reduce(
  (lookup: Record<Weekday, Availability>, weekday: Weekday) => {
    lookup[weekday] = { availabilityHours: [{ from, to }], isAvailable: false }
    return lookup
  },
  {},
)

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
      ...initialValues,
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
