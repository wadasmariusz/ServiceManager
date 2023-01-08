import { useFormContext } from 'react-hook-form'
import { Button, ButtonProps } from 'components/common/mantine/Button'

export type InputSubmitProps = ButtonProps

export const InputSubmit = ({
  text,
  onClick,
  children,
  ...props
}: InputSubmitProps) => {
  const { formState } = useFormContext()
  const { isSubmitting } = formState

  return (
    <Button
      text={text}
      type={'submit'}
      loading={isSubmitting}
      onClick={onClick}
      {...props}
    >
      {children}
    </Button>
  )
}
