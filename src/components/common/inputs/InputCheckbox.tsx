import { Checkbox as MantineCheckbox, CheckboxProps } from '@mantine/core'
import { RefCallBack } from 'react-hook-form'
import { Controller, FieldError, useFormContext } from 'react-hook-form'

export type InputCheckboxProps = {
  name: string
  label: string
  description?: string
} & Omit<CheckboxProps, 'error' | 'description' | 'icon' | 'label'>

export type InputCheckboxPureProps = {
  label: string
  description?: string
  error?: FieldError
  innerRef: RefCallBack
  onChange?: React.ChangeEventHandler
} & Omit<CheckboxProps, 'error' | 'description' | 'icon' | 'label'>

export const InputCheckbox = ({
  name,
  label,
  ...props
}: InputCheckboxProps) => {
  const { control } = useFormContext()
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { ref, ...field }, fieldState }) => {
        const { error } = fieldState
        return (
          <InputCheckboxPure
            {...field}
            {...props}
            label={label}
            innerRef={ref}
            error={error}
          />
        )
      }}
    />
  )
}

export const InputCheckboxPure = ({
  label,
  error,
  innerRef,
  onChange,
  value,
  ...props
}: InputCheckboxPureProps) => {
  return (
    <MantineCheckbox
      ref={innerRef}
      label={label}
      error={error?.message}
      onChange={onChange}
      value={value ?? ''}
      {...props}
    />
  )
}
