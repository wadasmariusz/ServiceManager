import { Route } from 'react-router-dom'
import { routes } from 'app/router'
import ViewAccessibility from './ViewAccessibility'

export const AdminPanelAccessibilityRoutes = [
  <Route
    key={routes['admin-panel.accessibility']}
    path={routes['admin-panel.accessibility']}
    element={<ViewAccessibility />}
  />,
]
