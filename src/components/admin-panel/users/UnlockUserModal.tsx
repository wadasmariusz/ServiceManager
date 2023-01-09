import {
  QueryObserverResult,
  RefetchOptions,
  RefetchQueryFilters,
  useMutation,
} from 'react-query'

import { TUseMutationErrors } from 'app/api/axios'
import { putUnlockUser } from 'app/api/admin/users/putUnlockUser'

import { TUserItem } from 'app/api/admin/users/getUsers'
import { TUser } from 'app/api/admin/users/getUser'

import mantineNotification from 'components/common/mantine/notifications'
import { Modal } from 'components/common/modals/Modal'
import { Button, Group, Space, Text } from '@mantine/core'
import { isApiRuntimeError } from 'components/common/api/ApiErrors'

type TModalProps = {
  user: TUserItem | TUser
  opened: boolean
  setOpened: (opened: boolean) => void
  refetchFn:
    | (<TPageData>(
        options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined,
      ) => Promise<QueryObserverResult<unknown, unknown>>)
    | undefined
}

const UnlockUserModal = ({
  user,
  refetchFn,
  opened,
  setOpened,
}: TModalProps) => {
  const unlockMutation = useMutation(putUnlockUser, {
    onError: (error: TUseMutationErrors) => {
      if (isApiRuntimeError(error)) {
        mantineNotification.error({
          message: error?.response?.data?.errors[0]?.message,
        })
      }
    },
    onSuccess: () => {
      mantineNotification.success({
        message: 'Użytkownik odblokowany pomyślnie',
      })
      refetchFn && refetchFn()
    },
  })
  const handleUnlockUser = (userId: string) => {
    setOpened(false)
    unlockMutation.mutate(userId)
  }
  return (
    <>
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title="Odblokuj użytkownika"
      >
        <Text>
          Czy na pewno chcesz odblokować użytkownika
          <Text fw={600}>
            {user.firstName && user.lastName
              ? user?.firstName + ' ' + user.lastName
              : 'brak danych'}
          </Text>
        </Text>

        <Space h="xl" />

        <Group position="right" spacing="xl">
          <Button onClick={() => setOpened(false)} variant="outline">
            Anuluj
          </Button>
          <Button onClick={() => handleUnlockUser(user.userId)} color="green">
            Odblokuj
          </Button>
        </Group>
      </Modal>
    </>
  )
}

export default UnlockUserModal
