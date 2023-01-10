import { ROLE_ADMIN } from './roles'
import { To } from 'react-router-dom'

import { routes } from 'app/router'

import { IconType } from 'react-icons'

import { AiOutlineHome } from 'react-icons/ai'
import { FiUsers } from 'react-icons/fi'
import { RiCustomerService2Fill } from 'react-icons/ri'

type TSideNavItemConfig = {
  navigateWithSearch: boolean
}

export type TSideNavItem = {
  id: string
  label: string
  icon?: IconType
  roles?: string[]
  route?: To
  routes?: TSideNavLink[]
  config?: TSideNavItemConfig
}

type TSideNavLink = {
  id: string
  label: string
  route: To
  icon?: IconType
  roles?: string[]
  config?: TSideNavItemConfig
}

export const adminPanelSideNavigationConfig: TSideNavItem[] = [
  {
    id: 'home',
    label: 'Pulpit',
    route: routes['admin-panel.dashboard'],
    icon: AiOutlineHome,
    roles: [ROLE_ADMIN],
  },
  {
    id: 'users',
    label: 'Użytkownicy',
    route: routes['admin-panel.users'],
    icon: FiUsers,
    roles: [ROLE_ADMIN],
  },
  {
    id: 'services',
    label: 'Usługi',
    route: routes['admin-panel.services'],
    icon: RiCustomerService2Fill,
    roles: [ROLE_ADMIN],
  },
]
