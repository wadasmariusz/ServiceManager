import { Textarea, TextareaProps } from '@mantine/core'
import { RefCallBack } from 'react-hook-form'
import { Controller, FieldError, useFormContext } from 'react-hook-form'
import { IconType } from 'react-icons/lib'

export type InputTextAreaProps = {
  name: string
  label?: string
  icon?: IconType
  description?: string
  placeholder?: string
} & Omit<TextareaProps, 'error' | 'icon' | 'description' | 'label'>

export type InputTextAreaPureProps = {
  label?: string
  icon?: IconType
  description?: string
  placeholder?: string
  error?: FieldError
  innerRef: RefCallBack
  onChange?: React.ChangeEventHandler<HTMLTextAreaElement>
} & Omit<TextareaProps, 'error' | 'icon' | 'description' | 'label'>
export const InputTextArea = ({ name, icon, ...props }: InputTextAreaProps) => {
  const { control } = useFormContext()
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { ref, ...field }, fieldState }) => {
        const { error } = fieldState
        return (
          <InputTextAreaPure
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

export const InputTextAreaPure = ({
  icon: Icon,
  label,
  placeholder,
  error,
  innerRef,
  onChange,
  value,
  ...props
}: InputTextAreaPureProps) => {
  return (
    <Textarea
      ref={innerRef}
      label={label}
      placeholder={placeholder || label}
      icon={Icon ? <Icon size={'1.2em'} /> : null}
      error={error?.message}
      onChange={onChange}
      value={value ?? ''}
      minRows={2}
      autosize
      withAsterisk={false}
      {...props}
    />
  )
}
