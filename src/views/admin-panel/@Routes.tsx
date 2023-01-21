import { routes } from 'app/router'
import { Route, Navigate } from 'react-router-dom'

import RequireAuth from 'app/router/RequireAuth'
import TemplateAdminPanel from 'components/templates/TemplateAdminPanel'

import { AdminPanelDashboardRoutes } from './dashboard/@Routes'
import { AdminPanelUsersRoutes } from './users/@Routes'
import { AdminPanelServicesRoutes } from './services/@Routes'
import { AdminPanelAvailabilityRoutes } from './availability/@Routes'

export const adminPanelRoutes = [
  <Route
    key={routes['admin-panel']}
    path={routes['admin-panel']}
    element={
      <RequireAuth roles={['Administrator']}>
        <TemplateAdminPanel />
      </RequireAuth>
    }
  >
    <Route
      path={routes['admin-panel']}
      element={<Navigate to={routes['admin-panel.dashboard']} />}
    />
    {AdminPanelDashboardRoutes},{AdminPanelUsersRoutes},
    {AdminPanelServicesRoutes},{AdminPanelAvailabilityRoutes}
  </Route>,
]
