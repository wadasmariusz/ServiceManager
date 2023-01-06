import { r } from 'app/router'
import { useAuth } from 'app/store'
import { Location, Navigate, useLocation } from 'react-router-dom'

export interface RouteGuardProps {
  roles?: string[]
  children: JSX.Element
}

export interface LocationState {
  from: Location
}

export const RequireAuth = ({
  roles,
  children,
}: RouteGuardProps): JSX.Element => {
  const userId = useAuth((state) => state.userId)
  const userRoles = useAuth((state) => state.roles)
  const location = useLocation()

  if (!userId)
    return <Navigate to={r['auth.login']} state={{ from: location }} replace />

  const userHasRequiredRoles =
    !roles || (userRoles && roles.some((role) => userRoles.includes(role)))

  // TODO: ADD UNAUTHORIZED VIEW
  if (!userHasRequiredRoles) return <Navigate to={r['index']} />

  return children
}
