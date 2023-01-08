import { Route } from 'react-router-dom'
import { routes } from 'app/router'
import ViewUsers from './ViewUsers'
import ViewSingleUser from './ViewSingleUser'

export const AdminPanelUsersRoutes = [
  <Route
    key={routes['admin-panel.users']}
    path={routes['admin-panel.users']}
    element={<ViewUsers />}
  />,
  <Route
    key={routes['admin-panel.user']()}
    path={routes['admin-panel.user']()}
    element={<ViewSingleUser />}
  />,
]
