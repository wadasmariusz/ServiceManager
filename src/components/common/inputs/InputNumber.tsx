import { NumberInput, NumberInputProps } from '@mantine/core'
import { RefCallBack } from 'react-hook-form'
import { Controller, FieldError, useFormContext } from 'react-hook-form'
import { IconType } from 'react-icons/lib'

export type InputNumberProps = {
  name: string
  label?: string
  icon?: IconType
  description?: string
  placeholder?: string
  required?: boolean
} & Omit<
  NumberInputProps,
  'error' | 'icon' | 'description' | 'label' | 'required'
>

type InputNumberPureProps = {
  label?: string
  icon?: IconType
  description?: string
  placeholder?: string
  error?: FieldError
  innerRef: RefCallBack
} & Omit<
  NumberInputProps,
  'error' | 'icon' | 'description' | 'label' | 'required'
>

export const InputNumber = ({ name, icon, ...props }: InputNumberProps) => {
  const { control } = useFormContext()
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { ref, ...field }, fieldState }) => {
        const { error } = fieldState
        return (
          <InputNumberPure
            {...field}
            {...props}
            innerRef={ref}
            error={error}
            icon={icon}
          />
        )
      }}
    />
  )
}

export const InputNumberPure = ({
  icon: Icon,
  label,
  placeholder,
  error,
  innerRef,
  onChange,
  ...props
}: InputNumberPureProps) => {
  return (
    <NumberInput
      ref={innerRef}
      label={label}
      placeholder={placeholder || label}
      icon={Icon ? <Icon size={'1.2em'} /> : null}
      error={error?.message}
      onChange={onChange}
      {...props}
    />
  )
}
