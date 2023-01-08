import React from 'react'
import { Navigate } from 'react-router-dom'

import { useTypedSelector } from 'app/hooks/useTypedSelector'

import { routes } from './'
import { AppBarLoader } from 'components/common/special/AppBarLoader'

type RequireAuthProps = {
  roles: string[]
  children: React.ReactNode
}

const RequireAuth: React.FC<RequireAuthProps> = ({ roles, children }) => {
  const [userId, role, permissions] = useTypedSelector(({ auth }) => [
    auth.userId,
    auth.role,
    auth.permissions,
  ])
  //console.log("RequireAuth userId:", userId,  "role:",  role, "permissions:", permissions)

  //TODO: to be verified when API authorization will be ready
  const haveRoles = role && roles ? true : true
  const havePermissions = permissions ? true : true

  if (!userId) return <Navigate to={routes['auth.login']} />

  if (haveRoles && havePermissions) return <>{children}</>

  // if(!havePermissions || !role) return <Navigate to={routes["auth.login"]} />;

  return <AppBarLoader />
}

export default RequireAuth
