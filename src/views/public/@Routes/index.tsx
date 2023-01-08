import { routes } from 'app/router'
import RequireGuest from 'app/router/RequireGuest'
import { Navigate, Route } from 'react-router-dom'
import ViewSignIn from '../auth/ViewSignIn'

export const publicRoutes = [
  <Route
    key={routes['index']}
    path={routes['index']}
    element={<Navigate to={routes['auth.login']} />}
  />,
  <Route
    key={routes['auth.login']}
    path={routes['auth.login']}
    element={
      <RequireGuest>
        <ViewSignIn />
      </RequireGuest>
    }
  />,
]
