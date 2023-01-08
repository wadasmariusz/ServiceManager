import React from 'react'
import {
  Controller,
  FieldError,
  useFormContext,
  RefCallBack,
} from 'react-hook-form'

import { Select, SelectProps } from '@mantine/core'

export type InputSelectProps = {
  name: string
} & Omit<SelectProps, 'error'>

export type InputSelectPureProps = {
  innerRef: RefCallBack
  error: FieldError | undefined
} & InputSelectProps

export const InputSelect = ({ name, icon, ...props }: InputSelectProps) => {
  const { control } = useFormContext()

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { ref, ...field }, fieldState }) => {
        const { error } = fieldState
        return (
          <InputSelectPure
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

export const InputSelectPure: React.FC<InputSelectPureProps> = ({
  label,
  placeholder,
  icon: Icon,
  error,
  innerRef,
  onChange,
  value,
  data,
  ...props
}) => {
  return (
    <Select
      value={value?.toString()}
      ref={innerRef}
      onChange={onChange}
      data={data}
      label={label}
      placeholder={placeholder || label?.toString()}
      icon={Icon}
      error={error?.message ? error.message : false}
      {...props}
    />
  )
}
