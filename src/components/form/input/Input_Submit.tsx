import { Button, DefaultProps } from '@mantine/core'
import { useFormContext } from 'react-hook-form'
import { IconType } from 'react-icons'

interface InputSubmitProps extends DefaultProps {
  value: string
  icon?: IconType
  disabled?: boolean
}

export const InputSubmit = ({
  value = 'Wyślij',
  icon: Icon,
  disabled = false,
  ...props
}: InputSubmitProps) => {
  const { formState } = useFormContext()
  const { isSubmitting } = formState

  return (
    <Button
      type="submit"
      loading={isSubmitting}
      leftIcon={Icon ? <Icon size={'1.2em'} /> : null}
      disabled={disabled}
      {...props}
    >
      {value}
    </Button>
  )
}
