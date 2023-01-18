import React from 'react'
import {
  Controller,
  FieldError,
  useFormContext,
  RefCallBack,
} from 'react-hook-form'

import { DatePicker, DatePickerProps } from '@mantine/dates'

import { IconType } from 'react-icons/lib'

type InputDatePickerProps = {
  name: string
  icon?: IconType
} & Omit<DatePickerProps, 'error' | 'icon'>

type InputDatePickerPureProps = {
  innerRef: RefCallBack
  error: FieldError | undefined
} & InputDatePickerProps

export const InputDatePicker = ({
  name,
  icon,
  ...props
}: InputDatePickerProps) => {
  const { control } = useFormContext()

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { ref, ...field }, fieldState }) => {
        const { error } = fieldState
        return (
          <InputDatePickerPure
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

export const InputDatePickerPure = ({
  label,
  placeholder,
  icon: Icon,
  error,
  innerRef,
  onChange,
  value,
  ...props
}: InputDatePickerPureProps) => {
  return (
    <DatePicker
      value={value ? new Date(value) : null}
      ref={innerRef}
      onChange={onChange}
      label={label}
      placeholder={placeholder || label?.toString()}
      icon={Icon && <Icon />}
      error={error?.message ? true : false}
      {...props}
    />
  )
}
