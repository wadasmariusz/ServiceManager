import { r } from 'app/router'
import { NavigationConfigItem } from './userMenuConfig'

export const publicMenuConfig: NavigationConfigItem[] = [
  {
    type: 'item',
    route: r['reports.list'],
    label: 'Reports',
  },
]
