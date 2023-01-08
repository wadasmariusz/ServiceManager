import { routes } from 'app/router'
import { useParams } from 'react-router-dom'

import { useGetUser } from 'app/api/admin/users/getUser'

import { Breadcrumb } from 'components/common/layout'

import dayjs from 'dayjs'

import {
  Badge,
  Card,
  Center,
  Divider,
  Group,
  Menu,
  Stack,
  Text,
  ThemeIcon,
} from '@mantine/core'

import { FaUser } from 'react-icons/fa'
import { MdAdminPanelSettings, MdBlock } from 'react-icons/md'
import LockUserModal from '../../../components/admin-panel/users/LockUserModal'
import UnlockUserModal from 'components/admin-panel/users/UnlockUserModal'
import { FiUnlock } from 'react-icons/fi'
import { useState } from 'react'

const ViewSingleUser = () => {
  const [menuOpened, setMenuOpened] = useState(false)
  const [lockUserModalOpened, setLockUserModalOpened] = useState(false)
  const [unLockUserModalOpened, setUnlockUserModalOpened] = useState(false)

  const { userId } = useParams()

  const query = useGetUser(userId)

  const { refetch } = query

  const user = query.data
  const breadcrumbItems = [
    {
      label: 'Użytkownicy',
      url: routes['admin-panel.users'],
    },
    {
      label: `${user?.email}`,
      url: routes['admin-panel.user'](userId),
    },
  ]

  return (
    <>
      <Breadcrumb items={breadcrumbItems} />
      <Card
        style={{
          background: 'white',
          boxShadow: '0 5px 60px rgb(128 128 128 / 20%)',
          borderRadius: '16px',
        }}
      >
        <Card.Section pt={50}>
          <Center>
            <Stack align="center">
              {user?.role == 'admin' && (
                <ThemeIcon size={70} radius="md" color="red" variant="light">
                  <MdAdminPanelSettings size={50} />
                </ThemeIcon>
              )}
              {user?.role == 'user' && (
                <ThemeIcon size={70} radius="md" color="blue" variant="light">
                  <FaUser size={50} />
                </ThemeIcon>
              )}

              <Text size="xl">
                {user?.firstName && user?.lastName
                  ? user?.firstName + ' ' + user?.lastName
                  : 'brak danych'}
              </Text>

              <Text>
                {user?.role == 'admin' && (
                  <Text>
                    <Badge size="md" color="red" radius="xs">
                      Admin
                    </Badge>
                  </Text>
                )}
                {user?.role == 'user' && (
                  <Text>
                    <Badge size="md" color="blue" radius="xs">
                      Użytkownik
                    </Badge>
                  </Text>
                )}
              </Text>
              <Group>
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
              </Group>
            </Stack>
          </Center>
        </Card.Section>
        <Divider my="xl" />
        <Card.Section pl={20} pb={20}>
          <Stack>
            <Text transform="uppercase" color="dimmed">
              Informacje
            </Text>
            <Group spacing="xs">
              <Text inline color="dimmed" fw={600}>
                Imie i Nazwisko:
              </Text>
              <Text>
                {user?.firstName && user?.lastName
                  ? user?.firstName + ' ' + user?.lastName
                  : 'brak danych'}
              </Text>
            </Group>
            <Group spacing="xs">
              <Text inline color="dimmed" fw={600}>
                Email:
              </Text>
              <Text>{user?.email}</Text>
            </Group>
            <Group spacing="xs">
              <Text inline color="dimmed" fw={600}>
                Numer telefonu:
              </Text>
              <Text>
                {user?.phoneNumber ? user?.phoneNumber : 'brak danych'}
              </Text>
            </Group>
            <Group spacing="xs">
              <Text inline color="dimmed" fw={600}>
                Status:
              </Text>
              <Text>
                {user?.state == 'active' && (
                  <Text>
                    <Badge size="md" color="green">
                      Aktywny
                    </Badge>
                  </Text>
                )}
                {user?.state == 'locked' && (
                  <Text>
                    <Badge size="md" color="red">
                      zablokowany
                    </Badge>
                  </Text>
                )}
              </Text>
            </Group>
            <Group spacing="xs">
              <Text inline color="dimmed" fw={600}>
                Rola:
              </Text>
              <Text>
                {user?.role == 'admin' && 'Admin'}
                {user?.role == 'user' && 'Użytkownik'}
              </Text>
            </Group>
            <Group spacing="xs">
              <Text inline color="dimmed" fw={600}>
                Data założenia:
              </Text>
              <Text>{dayjs(user?.createdAt).format('DD.MM.YYYY, HH:mm')}</Text>
            </Group>
            <Group spacing="xs">
              <Text inline color="dimmed" fw={600}>
                ID:
              </Text>
              <Text>{user?.userId}</Text>
            </Group>
            <Stack spacing="xs">
              <Text inline color="dimmed" fw={600}>
                Uprawnienia:
              </Text>
              <Group>
                {user?.permissions.map((premission) => (
                  <Badge radius="xs" key={premission}>
                    {premission}
                  </Badge>
                ))}
              </Group>
            </Stack>
          </Stack>
        </Card.Section>
      </Card>
      {user && (
        <LockUserModal
          opened={lockUserModalOpened}
          setOpened={setLockUserModalOpened}
          refetchFn={refetch}
          user={user}
        />
      )}
      {user && (
        <UnlockUserModal
          opened={unLockUserModalOpened}
          setOpened={setUnlockUserModalOpened}
          refetchFn={refetch}
          user={user}
        />
      )}
    </>
  )
}

{
  /* 
        TO-DO :
        -Rozwiązać błąd z propsami (user)
        */
}

export default ViewSingleUser
