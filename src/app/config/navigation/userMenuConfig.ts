import { routes } from 'app/router'
import { IconType } from 'react-icons'
import {
  MdLogout,
  FiSettings,
  FiLogIn,
  AiOutlineUserAdd,
} from 'react-icons/all'
import { To } from 'react-router-dom'
import { PERMISSION_GUEST, PERMISSION_USER } from '../permissions'

export interface NavigationConfigItem {
  type: 'item' | 'divider' | 'changeTheme' | 'logout'
  route?: To
  icon?: IconType
  label?: string
  permissions?: string[]
}

export const userMenuConfig: NavigationConfigItem[] = [
  {
    type: 'item',
    route: '#',
    icon: FiSettings,
    label: 'Settings',
    permissions: [PERMISSION_USER],
  },
  {
    type: 'item',
    route: routes['auth.login'],
    icon: FiLogIn,
    label: 'Login',
    permissions: [PERMISSION_GUEST],
  },
  {
    type: 'item',
    route: routes['auth.register'],
    icon: AiOutlineUserAdd,
    label: 'Register',
    permissions: [PERMISSION_GUEST],
  },
  {
    type: 'divider',
  },
  {
    type: 'logout',
    icon: MdLogout,
    label: 'Logout',
    permissions: [PERMISSION_USER],
  },
  { type: 'changeTheme' },
]
