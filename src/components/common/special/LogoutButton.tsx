import { Menu, Text } from '@mantine/core'
import { useModals } from '@mantine/modals'
import { NavigationConfigItem } from 'app/config/navigation/userMenuConfig'
import { r } from 'app/router'
import { useAuth } from 'app/store'
import { useNavigate } from 'react-router-dom'

export const LogoutButton = ({
  icon: Icon,
  label,
  type,
}: NavigationConfigItem) => {
  const modals = useModals()
  const navigate = useNavigate()
  const clearAuthState = useAuth((state) => state.clearAuthState)

  const openLogoutModal = () =>
    modals.openConfirmModal({
      title: 'Wyloguj się',
      centered: false,
      children: <Text size="sm">Czy na pewno chcesz się wylogować?</Text>,
      labels: {
        confirm: 'Wyloguj się',
        cancel: 'Anuluj',
      },
      confirmProps: { color: 'blue' },
      onConfirm: () => {
        clearAuthState()
        navigate(r['index'])
      },
    })

  return (
    <Menu.Item
      key={type}
      icon={Icon && <Icon size={16} />}
      onClick={openLogoutModal}
    >
      {label}
    </Menu.Item>
  )
}
