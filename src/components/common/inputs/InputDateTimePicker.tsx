import { Input, Paper, Popover, Stack, TextInputProps } from '@mantine/core'
import {
  Calendar,
  CalendarProps,
  TimeInput,
  TimeInputProps,
} from '@mantine/dates'
import { useClickOutside } from '@mantine/hooks'
import { forwardRef, useRef, useState } from 'react'
import dayjs from 'dayjs'
import { IconType } from 'react-icons'
import { Controller, FieldError, useFormContext } from 'react-hook-form'
import { TiTimes } from 'react-icons/ti'

export const InputDateTimePicker = (props: InputDateTimePickerProps) => {
  const { control } = useFormContext()

  if (!props.name) throw new Error('Missing name prop')

  return (
    <Controller
      name={props.name}
      control={control}
      render={({ field: { ref, ...field }, fieldState }) => {
        const { error } = fieldState
        return (
          <InputDateTimePickerPure
            {...field}
            {...props}
            ref={ref}
            error={error}
            icon={props.icon}
          />
        )
      }}
    />
  )
}

export interface InputDateTimePickerProps
  extends Omit<TextInputProps, 'icon' | 'error' | 'onChange'> {
  icon?: IconType
  calendarProps?: CalendarProps
  timeProps?: TimeInputProps
  error?: FieldError
  onChange?: (value: string) => void
  minDate?: Date
  maxDate?: Date
  format?: string
  justDatePicker?: boolean
  initialLevel?: string
  clearable?: boolean
}

// eslint-disable-next-line react/display-name
export const InputDateTimePickerPure = forwardRef<
  HTMLInputElement,
  InputDateTimePickerProps
>(
  (
    {
      name,
      value,
      label,
      onChange,
      icon: Icon,
      calendarProps,
      timeProps,
      required,
      format = 'DD.MM.YYYY, HH:mm',
      justDatePicker = false,
      minDate,
      maxDate,
      placeholder,
      clearable,
      error,
    },
    ref,
  ) => {
    const timeRef = useRef<HTMLInputElement | null>(null)
    const [popoverOpened, setPopoverOpened] = useState<boolean>(false)
    const [calendarValue, setCalendarValue] = useState<Date | undefined>()
    const [timeValue, setTimeValue] = useState<Date | undefined>(
      value ? (value as unknown as Date) : undefined,
    )

    const containerRef = useClickOutside(() => setPopoverOpened(false))

    const handleCalendarChange = (value: Date) => {
      setCalendarValue(value)
      setTimeValue(dayjs(value).add(12, 'h').toDate())
      onChange && onChange(dayjs(value).add(12, 'h').toISOString())
      if (timeRef.current) timeRef?.current.focus()
    }
    const handleChange = (value: Date) => {
      onChange && onChange(value.toISOString())
      setTimeValue(value)
    }
    return (
      <Popover
        opened={popoverOpened}
        position="bottom-start"
        transition="pop-top-left"
      >
        <Popover.Target>
          <Input.Wrapper
            autoCorrect="false"
            onFocusCapture={() => setPopoverOpened(true)}
            label={label}
            size="sm"
            required={required}
            error={error?.message}
            className="relative"
          >
            <div className="relative">
              <Input
                icon={Icon ? <Icon color="currentColor" size="1.2em" /> : null}
                name={name}
                placeholder={placeholder}
                autoComplete="off"
                size="md"
                radius="md"
                value={timeValue ? dayjs(timeValue).format(format) : ''}
              />
              {timeValue && clearable && (
                <div
                  onClick={(ev) => {
                    ev.stopPropagation()
                    setTimeValue(undefined)
                  }}
                  className="absolute top-1/2 right-2 -translate-y-1/2 cursor-pointer"
                >
                  <TiTimes className="m-0 text-gray-300" />
                </div>
              )}
            </div>
          </Input.Wrapper>
        </Popover.Target>
        <Popover.Dropdown>
          <Paper ref={containerRef}>
            <Stack>
              <Calendar
                value={calendarValue}
                onChange={handleCalendarChange}
                minDate={minDate}
                maxDate={maxDate}
                locale="pl"
                {...calendarProps}
              ></Calendar>
              {!justDatePicker && (
                <TimeInput
                  label="Godzina"
                  ref={(node) => {
                    timeRef.current = node
                    if (typeof ref === 'function') {
                      ref(node)
                    } else if (ref) {
                      ref.current = node
                    }
                  }}
                  value={dayjs(timeValue).toDate()}
                  onChange={handleChange}
                  format="24"
                  onKeyDown={(e) => {
                    if (e.code === 'Enter') {
                      e.preventDefault()
                      setPopoverOpened(false)
                    }
                  }}
                  {...timeProps}
                />
              )}
            </Stack>
          </Paper>
        </Popover.Dropdown>
      </Popover>
    )
  },
)
