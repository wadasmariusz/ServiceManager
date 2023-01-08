import { ROLE_ADMIN } from './roles'
import { To } from 'react-router-dom'

import { r } from 'app/router'

import { IconType } from 'react-icons'

import { AiOutlineHome } from 'react-icons/ai'

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
    route: r['admin-panel.dashboard'],
    icon: AiOutlineHome,
    roles: [ROLE_ADMIN],
  },
]
