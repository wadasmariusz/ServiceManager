import { TimeInput as MantineTimeInput, TimeInputProps } from '@mantine/dates'
import { RefCallBack } from 'react-hook-form'
import { Controller, FieldError, useFormContext } from 'react-hook-form'
import { IconType } from 'react-icons/lib'

export type InputTimeProps = {
  name: string
  label?: string
  icon?: IconType
  placeholder?: string
  desciption?: string
} & Omit<
  TimeInputProps,
  'placeholder' | 'description' | 'icon' | 'label' | 'error'
>

export type InputTimePureProps = {
  label?: string
  icon?: IconType
  desciption?: string
  placeholder?: string
  error?: FieldError
  innerRef: RefCallBack
  onChange?: (value: Date) => void
} & Omit<
  TimeInputProps,
  'placeholder' | 'description' | 'icon' | 'label' | 'error'
>

export const InputTime = ({ name, icon, ...props }: InputTimeProps) => {
  const { control } = useFormContext()
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { ref, ...field }, fieldState }) => {
        const { error } = fieldState
        return (
          <InputTimePure
            {...field}
            {...props}
            error={error}
            innerRef={ref}
            icon={icon}
          />
        )
      }}
    />
  )
}

export const InputTimePure = ({
  label,
  icon: Icon,
  placeholder,
  error,
  innerRef,
  onChange,
  ...props
}: InputTimePureProps) => {
  return (
    <MantineTimeInput
      ref={innerRef}
      label={label}
      placeholder={placeholder}
      icon={Icon ? <Icon /> : null}
      error={error?.message}
      onChange={onChange}
      {...props}
    />
  )
}
