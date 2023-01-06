import { Alert, Stack } from '@mantine/core'
import { useFormContext } from 'react-hook-form'

export const HookFormError = () => {
  const { formState } = useFormContext()
  const { errors } = formState

  const errorsData = Object.entries(errors).filter(
    ([, value]) => value.type === 'API',
  )

  if (errorsData.length > 0)
    return (
      <Stack mb={'xl'}>
        {errorsData.map(([key, value]) => (
          <Alert key={key} color="red" variant="filled">
            {value.message}
          </Alert>
        ))}
      </Stack>
    )
  else return null
}
