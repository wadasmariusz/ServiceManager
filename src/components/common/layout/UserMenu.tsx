import { forwardRef, useMemo } from 'react'
import { HiChevronRight } from 'react-icons/all'
import {
  Group,
  Avatar,
  Text,
  UnstyledButton,
  Menu,
  Divider,
} from '@mantine/core'
import { userMenuConfig } from 'app/config/navigation/userMenuConfig'
import { Link } from 'react-router-dom'
import { useAuth } from 'app/store'
import { ChangeThemeButton, LogoutButton } from '../special'

interface UserButtonProps extends React.ComponentPropsWithoutRef<'button'> {
  name?: string
  email: string | null
  icon?: React.ReactNode
}

export const UserButton = forwardRef<HTMLButtonElement, UserButtonProps>(
  ({ name, email, icon, ...others }: UserButtonProps, ref) => (
    <UnstyledButton
      ref={ref}
      sx={(theme) => ({
        display: 'block',
        width: '100%',
        padding: theme.spacing.xs,
        color:
          theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,

        '&:hover': {
          backgroundColor:
            theme.colorScheme === 'dark'
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      })}
      {...others}
    >
      <Group>
        {email ? (
          <Avatar
            src={`https://avatars.dicebear.com/api/initials/${email}.svg`}
            radius="xl"
          />
        ) : (
          <Avatar radius="xl" />
        )}

        {email ? (
          <div style={{ flex: 1 }}>
            <Text size="sm" weight={500}>
              {name}
            </Text>

            <Text color="dimmed" size="xs">
              {email}
            </Text>
          </div>
        ) : (
          <Text size="sm" weight={500}>
            Twoje konto
          </Text>
        )}

        {icon || <HiChevronRight size={16} />}
      </Group>
    </UnstyledButton>
  ),
)

UserButton.displayName = 'UserButton'

export const UserMenu = () => {
  const { email, roles } = useAuth((state) => state)

  const menuItems = useMemo(
    () => [
      ...userMenuConfig
        .filter(
          (item) =>
            item.permissions === undefined ||
            item.permissions.some((permission) => roles?.includes(permission)),
        )
        .map(({ icon: Icon, type, route, label }, idx) => {
          if (route !== undefined && type === 'item')
            return (
              <Menu.Item
                key={idx}
                component={Link}
                icon={Icon && <Icon size={16} />}
                to={route}
              >
                {label}
              </Menu.Item>
            )
          if (type === 'logout')
            return <LogoutButton {...{ type, label }} icon={Icon} key={idx} />
          if (type === 'changeTheme') return <ChangeThemeButton key={idx} />
          if (type === 'divider') return <Divider key={idx} />
        }),
    ],
    [roles],
  )

  return (
    <Group position="center">
      <Menu transition="pop-top-right" withArrow position="bottom-end">
        <Menu.Target>
          <UserButton email={email} />
        </Menu.Target>
        <Menu.Dropdown>{menuItems}</Menu.Dropdown>
      </Menu>
    </Group>
  )
}
