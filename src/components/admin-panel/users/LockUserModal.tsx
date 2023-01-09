import {
  QueryObserverResult,
  RefetchOptions,
  RefetchQueryFilters,
  useMutation,
} from 'react-query'

import { putLockUser } from 'app/api/admin/users/putLockUser'
import { TUser } from 'app/api/admin/users/getUser'
import { TUserItem } from 'app/api/admin/users/getUsers'

import mantineNotification from 'components/common/mantine/notifications'
import { Modal } from 'components/common/modals/Modal'
import { Button, Group, Space, Text } from '@mantine/core'
import { TUseMutationErrors } from 'app/api/axios'
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

const LockUserModal = ({ user, refetchFn, opened, setOpened }: TModalProps) => {
  const lockMutation = useMutation(putLockUser, {
    onError: (error: TUseMutationErrors) => {
      if (isApiRuntimeError(error)) {
        mantineNotification.error({
          message: error?.response?.data?.errors[0]?.message,
        })
      }
    },
    onSuccess: () => {
      mantineNotification.success({
        message: 'Użytkownik zablokowany pomyślnie',
      })
      refetchFn && refetchFn()
    },
  })
  const handleLockUser = (userId: string) => {
    setOpened(false)
    lockMutation.mutate(userId)
  }
  return (
    <>
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title="Zablokuj użytkownika"
      >
        <Text>
          Czy na pewno chcesz zablokować użytkownika
          <Text fw={600}>
            {user?.firstName && user?.lastName
              ? user?.firstName + ' ' + user?.lastName
              : 'brak danych'}
          </Text>
        </Text>

        <Space h="xl" />

        <Group position="right" spacing="xl">
          <Button onClick={() => setOpened(false)} variant="outline">
            Anuluj
          </Button>
          <Button onClick={() => handleLockUser(user?.userId)} color="red">
            Zablokuj
          </Button>
        </Group>
      </Modal>
    </>
  )
}

export default LockUserModal
