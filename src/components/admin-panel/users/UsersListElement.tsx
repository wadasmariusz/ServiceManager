import { Link } from 'react-router-dom'
import { routes } from 'app/router'

import LockUserModal from './LockUserModal'
import UnlockUserModal from './UnlockUserModal'

import { Text } from 'components/common/mantine/Text'
import { createStyles } from '@mantine/styles'
import { Badge, Center, Group, Menu } from '@mantine/core'

import dayjs from 'dayjs'

import { TUserItem } from 'app/api/admin/users/getUsers'

import { FaUser } from 'react-icons/fa'
import { MdEmail, MdAdminPanelSettings, MdBlock } from 'react-icons/md'
import { useQueryContext } from 'app/context/PaginatedQueryProvider'
import { useState } from 'react'
import { FiUnlock } from 'react-icons/fi'

const useStyles = createStyles(() => ({
  link: {
    display: 'block',
    cursor: 'pointer',
    '&:hover': {
      color: '#228be6',
    },
  },
  inline: {
    display: 'inline',
  },
}))

interface IUser {
  user: TUserItem
}

const UsersListElement = ({ user }: IUser) => {
  const [menuOpened, setMenuOpened] = useState(false)
  const [lockUserModalOpened, setLockUserModalOpened] = useState(false)
  const [unLockUserModalOpened, setUnlockUserModalOpened] = useState(false)

  const { classes } = useStyles()

  const { refetch } = useQueryContext()

  return (
    <>
      <tr>
        <td>
          <Text
            component={Link}
            to={routes['admin-panel.user'](user?.userId)}
            className={classes.link}
          >
            {user.firstName && user.lastName
              ? user.firstName + ' ' + user.lastName
              : 'brak danych'}
          </Text>
          <Text
            component={Link}
            to={routes['admin-panel.user'](user?.userId)}
            className={classes.link}
            color="dimmed"
            fz="xs"
          >
            <MdEmail className={classes.inline} />
            {user.email}
          </Text>
        </td>
        <td>
          <Text>{user.phoneNumber ? user.phoneNumber : 'brak danych'}</Text>
        </td>
        <td>
          {user.role == 'admin' && (
            <Text>
              <Badge size="md" color="red">
                <MdAdminPanelSettings size={15} className={classes.inline} />
              </Badge>
              Admin
            </Text>
          )}
          {user.role == 'user' && (
            <Text>
              <Badge size="md" c="blue">
                <FaUser size={15} className={classes.inline} />
              </Badge>
              Użytkownik
            </Text>
          )}
          {user.role === null && 'brak danych'}
        </td>
        <td>
          {user.state == 'active' && (
            <Text>
              <Badge size="md" c="green">
                Aktywny
              </Badge>
            </Text>
          )}
          {user.state == 'locked' && (
            <Text>
              <Badge size="md" c="red">
                zablokowany
              </Badge>
            </Text>
          )}
        </td>
        <td>{dayjs(user.createdAt).format('DD.MM.YYYY, HH:mm')}</td>
        <td>
          <Menu opened={menuOpened} onChange={setMenuOpened}>
            <Menu.Target>
              <button>
                <Text size={30} color="dimmed">
                  &middot;&middot;&middot;
                </Text>
              </button>
            </Menu.Target>

            <Menu.Dropdown>
              <Menu.Label>
                <Center>Akcje</Center>
              </Menu.Label>
              <Menu.Item onClick={() => setLockUserModalOpened(true)}>
                <Group>
                  <Badge color="red" size="md">
                    <MdBlock size={15} />
                  </Badge>
                  Zablokuj
                </Group>
              </Menu.Item>
              <Menu.Item onClick={() => setUnlockUserModalOpened(true)}>
                <Group>
                  <Badge color="green" size="md">
                    <FiUnlock size={15} />
                  </Badge>
                  Odblokuj
                </Group>
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </td>
      </tr>
      <LockUserModal
        opened={lockUserModalOpened}
        setOpened={setLockUserModalOpened}
        refetchFn={refetch}
        user={user}
      />
      <UnlockUserModal
        opened={unLockUserModalOpened}
        setOpened={setUnlockUserModalOpened}
        refetchFn={refetch}
        user={user}
      />
    </>
  )
}

export default UsersListElement
