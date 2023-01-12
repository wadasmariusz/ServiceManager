import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

import { TextareaProps } from '@mantine/core'
import { Controller, useFormContext } from 'react-hook-form'
import { IconType } from 'react-icons/lib'
import { Text, Stack } from '@mantine/core'

export type InputRichTextAreaPureProps = {
  label?: string
  name: string
  icon?: IconType
  description?: string
  placeholder?: string
} & Omit<TextareaProps, 'error' | 'icon' | 'description' | 'label'>
export const InputRichTextArea = ({
  name,
  label,
  ...props
}: InputRichTextAreaPureProps) => {
  const { control } = useFormContext()
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { ref, value, ...field } }) => {
        return (
          <Stack spacing={0}>
            {label && (
              <Text size="sm" weight={500}>
                {label}
              </Text>
            )}
            {/* @ts-expect-error problems with ReactQuill types */}
            <ReactQuill
              ref={ref}
              minRows={2}
              autosize
              value={value}
              withAsterisk={false}
              theme="snow"
              {...props}
              {...field}
            />
          </Stack>
        )
      }}
    />
  )
}
