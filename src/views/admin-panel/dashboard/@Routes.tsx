import { Route } from 'react-router-dom'
import { routes } from 'app/router'
import { ViewAdminDashboard } from './ViewAdminDashboard'

export const AdminPanelDashboardRoutes = [
  <Route
    path={routes['admin-panel.dashboard']}
    key={routes['admin-panel.dashboard']}
    element={<ViewAdminDashboard />}
  />,
]
