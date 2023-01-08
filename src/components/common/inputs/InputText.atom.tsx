import { TextInput, TextInputProps } from '@mantine/core'
import { RefCallBack } from 'react-hook-form'
import { Controller, FieldError, useFormContext } from 'react-hook-form'
import { IconType } from 'react-icons/lib'

export type InputTextProps = {
  name: string
  label?: string
  icon?: IconType
  description?: string
  placeholder?: string
  required?: boolean
} & Omit<
  TextInputProps,
  'error' | 'icon' | 'description' | 'label' | 'required'
>

type InputTextPureProps = {
  label?: string
  icon?: IconType
  description?: string
  placeholder?: string
  error?: FieldError
  innerRef: RefCallBack
  onChange?: React.ChangeEventHandler<HTMLInputElement>
  value?: string
} & Omit<
  TextInputProps,
  'error' | 'icon' | 'description' | 'label' | 'required'
>

export const InputText = ({ name, icon, ...props }: InputTextProps) => {
  const { control } = useFormContext()
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { ref, ...field }, fieldState }) => {
        const { error } = fieldState
        return (
          <InputTextPure
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

export const InputTextPure = ({
  icon: Icon,
  label,
  placeholder,
  error,
  innerRef,
  onChange,
  value,
  ...props
}: InputTextPureProps) => {
  return (
    <TextInput
      ref={innerRef}
      label={label}
      placeholder={placeholder || label}
      icon={Icon ? <Icon size={'1.2em'} /> : null}
      error={error?.message}
      onChange={onChange}
      value={value ?? ''}
      {...props}
    />
  )
}
