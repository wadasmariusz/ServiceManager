import { Route } from 'react-router-dom'
import { r } from 'app/router'
import { ViewAdminDashboard } from './ViewAdminDashboard'

export const AdminPanelDashboardRoutes = [
  <Route
    path={r['admin-panel.dashboard']}
    key={r['admin-panel.dashboard']}
    element={<ViewAdminDashboard />}
  />,
]
