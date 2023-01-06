import { Title, Paper, Text, Anchor } from '@mantine/core'
import { r } from 'app/router'
import { Link } from 'react-router-dom'
import { FormRegister } from './form/FormRegister'

const Register = () => {
  return (
    <>
      <div className="py-6 sm:py-8 lg:py-12">
        <Paper withBorder className="mx-auto max-w-lg">
          <Paper
            sx={(theme) => ({
              backgroundColor:
                theme.colorScheme === 'dark'
                  ? theme.colors.dark[8]
                  : theme.colors.gray[0],
            })}
            p="xl"
            radius={0}
          >
            <Title order={2} mb={'xl'} align="center">
              Rejestracja
            </Title>
            <FormRegister />
          </Paper>
          <Paper
            radius={0}
            sx={(theme) => ({
              backgroundColor:
                theme.colorScheme === 'dark'
                  ? theme.colors.dark[9]
                  : theme.colors.gray[1],
            })}
          >
            <Text align="center" py={'sm'}>
              Masz już konto?{' '}
              <Anchor component={Link} to={r['auth.login']}>
                Zaloguj się
              </Anchor>
            </Text>
          </Paper>
        </Paper>
      </div>
    </>
  )
}

export default Register
