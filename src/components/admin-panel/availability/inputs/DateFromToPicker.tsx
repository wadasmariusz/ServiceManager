import { Flex, Group, Stack } from '@mantine/core'
import { InputDateTimePicker } from 'components/common/inputs/InputDateTimePicker'
import { Button } from 'components/common/mantine/Button'
import dayjs from 'dayjs'
import { useFieldArray, useFormContext } from 'react-hook-form'
import { MdCalendarToday } from 'react-icons/md'
import { RxCrossCircled } from 'react-icons/rx'

const DateFromToPicker = () => {
  const { control } = useFormContext()
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'availabilityHours',
  })
  return (
    <Stack className="mt-5 w-[90%] sm:w-[60%]">
      <Stack align="end" className="w-full">
        <Button
          onClick={() => {
            append({
              from: dayjs().startOf('day').add(9, 'hour').toISOString(),
              to: dayjs().startOf('day').add(17, 'hour').toISOString(),
            })
          }}
          type="button"
          variant="outline"
          size="xs"
        >
          Dodaj daty
        </Button>
      </Stack>
      <Stack align="center" spacing={30}>
        {fields.map((field, index) => (
          <Group key={field.id}>
            <InputDateTimePicker
              label="Od"
              labelProps={{ size: 'sm' }}
              name={`availabilityHours.${index}.from`}
              icon={MdCalendarToday}
            />
            <InputDateTimePicker
              label="Do"
              name={`availabilityHours.${index}.to`}
              icon={MdCalendarToday}
            />
            <RxCrossCircled
              onClick={() => remove(index)}
              size={20}
              className="mt-6 ml-2 cursor-pointer justify-self-end md:ml-4"
              color="red"
            />
          </Group>
        ))}
      </Stack>
    </Stack>
  )
}

export default DateFromToPicker
