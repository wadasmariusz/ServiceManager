import { TextInput } from '@mantine/core'
import { RefCallBack } from 'react-hook-form'
import { Controller, FieldError, useFormContext } from 'react-hook-form'
import { IconType } from 'react-icons/lib'

interface InputTextProps {
  name: string
  label?: string
  icon?: IconType
  description?: string
  placeholder?: string
  required?: boolean
}

interface InputTextPureProps {
  label?: string
  icon?: IconType
  description?: string
  placeholder?: string
  error?: FieldError
  innerRef: RefCallBack
  onChange?: React.ChangeEventHandler<HTMLInputElement>
  value?: string
}

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
  error,
  innerRef,
  onChange,
  value,
  ...props
}: InputTextPureProps) => {
  return (
    <TextInput
      ref={innerRef}
      icon={Icon ? <Icon size={'1.2em'} /> : null}
      error={error?.message}
      onChange={onChange}
      value={value ?? ''}
      {...props}
    />
  )
}
