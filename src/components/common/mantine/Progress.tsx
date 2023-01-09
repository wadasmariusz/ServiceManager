import { Progress as MantineProgress } from '@mantine/core'
import { ProgressProps as MantineProgressProps } from '@mantine/core'

type ProgressProps = MantineProgressProps

export const Progress = ({ ...props }: ProgressProps) => {
  return <MantineProgress {...props} />
}
