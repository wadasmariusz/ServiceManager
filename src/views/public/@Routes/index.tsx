import { r } from 'app/router'
import RequireGuest from 'app/router/RequireGuest'
import { Navigate, Route } from 'react-router-dom'
import ViewSignIn from '../auth/ViewSignIn'

export const publicRoutes = [
  <Route
    key={r['index']}
    path={r['index']}
    element={<Navigate to={r['auth.login']} />}
  />,
  <Route
    key={r['auth.login']}
    path={r['auth.login']}
    element={
      <RequireGuest>
        <ViewSignIn />
      </RequireGuest>
    }
  />,
]
