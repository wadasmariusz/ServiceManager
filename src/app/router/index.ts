import { BASE_URL } from 'app/config/env'
import { adminRoutes } from './admin-panel'
import { publicRoutes } from './public'
import { reportRoutes } from './reports'

export const r = {
  index: `${BASE_URL}/`,
  ...publicRoutes,
  ...reportRoutes,
  ...adminRoutes,
}
