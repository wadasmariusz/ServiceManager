import { Alert as MantineAlert } from '@mantine/core'
import { AlertProps as MantineAlertProps } from '@mantine/core'
import { AlertCircle } from 'tabler-icons-react'

type AlerProps = {
  message?: string
  children?: React.ReactNode
} & Omit<MantineAlertProps, 'children'>

export const Alert = ({ message, children, ...props }: AlerProps) => {
  return (
    <MantineAlert icon={<AlertCircle size={16} />} {...props}>
      {children ?? message ?? null}
    </MantineAlert>
  )
}
