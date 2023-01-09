import { Text } from 'components/common/mantine/Text'
import { Title } from 'components/common/mantine/Title'
import { Divider } from '@mantine/core'
import { InputSubmit } from 'components/common/inputs/InputSubmit'
type TAuthFormProps = {
  handleSubmit: () => void
  children: React.ReactNode
  title?: string
  description?: string
  inputSubmitText?: string
}
export const AuthForm: React.FC<TAuthFormProps> = ({
  handleSubmit,
  children,
  title,
  description,
  inputSubmitText,
}) => {
  return (
    <>
      <form onSubmit={handleSubmit} className={'w-full'}>
        {/* TODO: add component to show api erros */}
        {/* <HookFormError /> */}

        <div className="flex flex-col gap-y-4">
          <span className="mb-4">
            <Title order={3}>{title}</Title>
            <Text className="mt-2" color="dimmed">
              {description}
            </Text>
          </span>

          <span className="flex flex-col gap-y-2">{children}</span>

          <span className="mt-4 text-center">
            <InputSubmit text={inputSubmitText} fullWidth />
          </span>
        </div>
      </form>
      <Divider my={20} />
    </>
  )
}
