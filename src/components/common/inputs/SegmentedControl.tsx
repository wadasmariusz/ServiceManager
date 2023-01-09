import React from 'react'
import { Controller, useFormContext, RefCallBack } from 'react-hook-form'

import {
  SegmentedControl,
  SegmentedControlProps as MantineSegmentedControlProps,
  useMantineTheme,
} from '@mantine/core'

export type SegmentedControlProps = {
  name: string
} & MantineSegmentedControlProps

export type SegmentedControlPureProps = {
  innerRef: RefCallBack
} & SegmentedControlProps

export const InputSegmentedControl = ({
  name,
  ...props
}: SegmentedControlProps) => {
  const { control } = useFormContext()
  const theme = useMantineTheme()
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { ref, ...field } }) => {
        return (
          <SegmentedControlPure
            {...field}
            color={theme.primaryColor}
            {...props}
            innerRef={ref}
          />
        )
      }}
    />
  )
}

export const SegmentedControlPure: React.FC<SegmentedControlPureProps> = ({
  innerRef,
  onChange,
  data,
  value,
  ...props
}) => {
  return (
    <SegmentedControl
      value={value?.toString()}
      ref={innerRef}
      onChange={onChange}
      data={data}
      {...props}
    />
  )
}
