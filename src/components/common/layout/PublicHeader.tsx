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
    <header className="px-8 w-full">
      <div className="container flex flex-col flex-wrap justify-between items-center py-5 mx-auto max-w-7xl md:flex-row">
        <div className="flex relative flex-col md:flex-row">
          <Text
            component={Link}
            to="/"
            className="flex items-center mb-5 font-medium md:mb-0 lg:justify-center lg:items-center lg:w-auto"
            style={
              dark
                ? { color: theme.colors.gray[0] }
                : { color: theme.colors.dark[5] }
            }
          >
            <img src={logo} />
          </Text>
          <nav className="flex flex-wrap items-center mb-5 text-base md:pl-8 md:mb-0 md:ml-8 md:border-l md:border-gray-200">
            {publicNavItems}
          </nav>
        </div>

        <div className="inline-flex items-center ml-5 space-x-6 lg:justify-end">
          <UserMenu />
        </div>
      </div>
    </header>
  )
}
