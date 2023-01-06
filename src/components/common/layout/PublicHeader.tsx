import {
  Button,
  Text,
  useMantineColorScheme,
  useMantineTheme,
} from '@mantine/core'
import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import logo from 'public/img/logo.svg'
import { UserMenu } from './UserMenu'
import { publicMenuConfig } from 'app/config/navigation/publicMenuConfig'

export const PublicHeader = () => {
  const theme = useMantineTheme()
  const { colorScheme } = useMantineColorScheme()
  const dark = useMemo(() => colorScheme === 'dark', [colorScheme])

  const publicNavItems = useMemo(
    () =>
      publicMenuConfig.map(({ route, label }, idx) => {
        if (route !== undefined)
          return (
            <Button
              key={idx}
              component={Link}
              to={route}
              variant="subtle"
              color="dark"
              compact
            >
              {label}
            </Button>
          )
      }),
    [],
  )

  return (
    <header className="w-full px-8">
      <div className="container mx-auto flex max-w-7xl flex-col flex-wrap items-center justify-between py-5 md:flex-row">
        <div className="relative flex flex-col md:flex-row">
          <Text
            component={Link}
            to="/"
            className="mb-5 flex items-center font-medium md:mb-0 lg:w-auto lg:items-center lg:justify-center"
            style={
              dark
                ? { color: theme.colors.gray[0] }
                : { color: theme.colors.dark[5] }
            }
          >
            <img src={logo} />
          </Text>
          <nav className="mb-5 flex flex-wrap items-center text-base md:mb-0 md:ml-8 md:border-l md:border-gray-200 md:pl-8">
            {publicNavItems}
          </nav>
        </div>

        <div className="ml-5 inline-flex items-center space-x-6 lg:justify-end">
          <UserMenu />
        </div>
      </div>
    </header>
  )
}
