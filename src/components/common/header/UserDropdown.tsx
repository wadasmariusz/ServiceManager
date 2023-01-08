import React, { useState, forwardRef } from 'react'
import { Link } from 'react-router-dom'
import { Menu, Divider, Avatar } from '@mantine/core'
import { useMantineTheme } from '@mantine/core'

import { useActions } from 'app/hooks/useActions'
import { useTypedSelector } from 'app/hooks/useTypedSelector'
import { logout } from 'app/api/auth/logout'
import { r } from 'app/router'

import { ConfirmModal } from 'components/common/modals/ConfirmModal'

import { FiLogOut } from 'react-icons/fi'
import { MdOutlineLogout } from 'react-icons/md'
import { AiOutlineUserAdd, AiOutlineUser } from 'react-icons/ai'

type ControlButtonProps = {
  className?: string
}

// eslint-disable-next-line react/display-name
const UserDropdownControlButton = forwardRef<
  HTMLButtonElement,
  ControlButtonProps
>((props, ref) => {
  const theme = useMantineTheme()
  const [email, role] = useTypedSelector(({ auth }) => [auth.email, auth.roles])

  return (
    <button ref={ref} {...props}>
      <div className="flex cursor-pointer items-center justify-end gap-x-4">
        {/* user dropdown name */}
        <div className="flex flex-col items-end">
          <div className="flex justify-end font-semibold ">
            <p className="max-w-[130px] truncate text-base">
              {email && `${email}`}
            </p>
          </div>

          <div className="text-sm ">{role && role}</div>
        </div>

        <Avatar size={45} radius="md" color={theme.primaryColor} />
      </div>
    </button>
  )
})

type MenuItem =
  | {
      link?: string
      label: string
      icon?: React.ReactNode
      onClick?: () => void
    }
  | 'divider'

// TODO: add more sophisticated logic for menu items
const guestMenuItems: MenuItem[] = [
  {
    link: r['auth.login'],
    label: 'Logowanie',
    icon: <AiOutlineUser size={16} />,
  },
  {
    link: r['auth.register'],
    label: 'Rejestracja',
    icon: <AiOutlineUserAdd size={16} />,
  },
]

type UserDropdownProps = {
  controlButtonProps?: ControlButtonProps
}

const UserDropdown = ({ controlButtonProps }: UserDropdownProps) => {
  const userId = useTypedSelector(({ auth }) => auth.userId)
  const [opened, setOpened] = useState<boolean>(false)
  const { _clearAuthStore } = useActions()

  const handleLogout = () => {
    //TODO: notification if logout has been successful
    logout()
      .then(() => {
        _clearAuthStore()
        // setIsOpen(false);
        //navigate(routes['index']);
      })
      .catch(() => {
        _clearAuthStore()
      })
  }

  return (
    <>
      <Menu position="top-end">
        <Menu.Target>
          <UserDropdownControlButton {...controlButtonProps} />
        </Menu.Target>

        <Menu.Dropdown sx={() => ({ minWidth: 240 })}>
          {!userId && (
            <>
              {guestMenuItems.map((item, id) =>
                typeof item === 'string' ? (
                  <Divider key={id} />
                ) : (
                  <Menu.Item
                    component={Link}
                    to={item?.link || ''}
                    icon={item?.icon}
                    key={id}
                  >
                    {item.label}
                  </Menu.Item>
                ),
              )}
            </>
          )}

          {userId && (
            <>
              <Menu.Item
                onClick={() => setOpened(true)}
                icon={<FiLogOut size={16} />}
              >
                Wyloguj
              </Menu.Item>
            </>
          )}
        </Menu.Dropdown>
      </Menu>

      <ConfirmModal
        opened={opened}
        onClose={() => setOpened(false)}
        icon={MdOutlineLogout}
        title={'Wyloguj'}
        message={'Czy na pewno chcesz się wylogować'}
        onConfirm={handleLogout}
        confirmBtnText={'Wyloguj'}
      />
    </>
  )
}

export default UserDropdown
