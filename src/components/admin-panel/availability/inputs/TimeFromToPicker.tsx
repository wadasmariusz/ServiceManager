import { Flex, Group, Stack } from '@mantine/core'
import { InputCheckbox } from 'components/common/inputs/InputCheckbox'
import { InputTime } from 'components/common/inputs/InputTime'
import { Button } from 'components/common/mantine/Button'
import { FieldError, useFieldArray, useFormContext } from 'react-hook-form'
import { AiOutlineClockCircle } from 'react-icons/ai'
import { RxCrossCircled } from 'react-icons/rx'
import dayjs from 'dayjs'

type TimeFromToPickerProps = {
  name: string
  checkboxLabel: string
  hasCopyFn?: boolean
  fieldsToPasteInto?: string[]
  error?: FieldError
  value?: {
    from: Date
    to: Date
  }
}

const TimeFromToPicker = ({
  checkboxLabel,
  name,
  hasCopyFn,
  fieldsToPasteInto,
}: // ...props
TimeFromToPickerProps) => {
  const { getValues, watch, control, setValue } = useFormContext()

  const { fields, append, remove } = useFieldArray({
    control,
    name: `${name}.availabilityHours`,
  })

  const watchIsAvailable = watch(`${name}.isAvailable`)

  const copyHoursToAllDays = () => {
    const fieldsToCopy = getValues(`${name}.availabilityHours`)

    fieldsToPasteInto?.forEach((field) => {
      setValue(`${field}.availabilityHours`, fieldsToCopy)
    })
  }

  return (
    <Stack className="mt-5 w-[90%] sm:w-[60%]">
      <Group position="apart">
        <InputCheckbox
          size="md"
          name={`${name}.isAvailable`}
          label={checkboxLabel}
        />

        <Button
          onClick={() => {
            append({
              from: dayjs().startOf('day').add(9, 'hour').toDate(),
              to: dayjs().startOf('day').add(17, 'hour').toDate(),
            })
          }}
          type="button"
          variant="outline"
          size="xs"
        >
          Dodaj godziny
        </Button>
      </Group>
      {fields.map((field, index) => (
        <Flex key={field.id} gap={{ base: 'sm', md: 'md' }} align="center">
          <InputTime
            label="Od"
            name={`${name}.availabilityHours.${index}.from`}
            className="w-[40%]"
            labelProps={{ size: 'xs' }}
            disabled={!watchIsAvailable}
            radius="md"
            size="md"
            icon={AiOutlineClockCircle}
          />
          <InputTime
            label="Do"
            name={`${name}.availabilityHours.${index}.to`}
            className="w-[40%]"
            labelProps={{ size: 'xs' }}
            disabled={!watchIsAvailable}
            radius="md"
            size="md"
            icon={AiOutlineClockCircle}
          />

          {index > 0 ? (
            <RxCrossCircled
              onClick={() => remove(index)}
              size={20}
              className="mt-6 ml-2 cursor-pointer justify-self-end md:ml-4"
              color="red"
            />
          ) : null}
        </Flex>
      ))}
      {hasCopyFn && (
        <Button
          type="button"
          onClick={copyHoursToAllDays}
          variant="default"
          size="xs"
        >
          Kopiuj te godziny dla wszytskich dni roboczych
        </Button>
      )}
    </Stack>
  )
}

export default TimeFromToPicker
