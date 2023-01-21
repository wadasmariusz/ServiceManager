import { Route } from 'react-router-dom'
import { routes } from 'app/router'
import ViewAvailability from './ViewAvailability'

export const AdminPanelAvailabilityRoutes = [
  <Route
    key={routes['admin-panel.availability']}
    path={routes['admin-panel.availability']}
    element={<ViewAvailability />}
  />,
]
