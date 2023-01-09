import React from 'react'
import { Navigate } from 'react-router-dom'
import { routes } from 'app/router'

import { useTypedSelector } from 'app/hooks/useTypedSelector'

type RequireGuestProps = {
  children: React.ReactNode
}

const RequireGuest: React.FC<RequireGuestProps> = ({ children }) => {
  const isAuth = useTypedSelector(({ auth }) => auth.userId)
  if (!isAuth) return <>{children}</>
  else return <Navigate to={routes['admin-panel.dashboard']} />
}

export default RequireGuest
