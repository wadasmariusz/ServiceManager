import { r } from 'app/router'
import { RequireGuest } from 'components/common'
import { lazy } from 'react'
import { Route } from 'react-router-dom'

const PublicLayout = lazy(() => import('layout/Public'))

const Login = lazy(() => import('../auth/login/Login'))
const Register = lazy(() => import('../auth/register/Register'))
const Home = lazy(() => import('../home/Home'))

export const publicRoutes = [
  <Route key={r['index']} path={r['index']} element={<PublicLayout />}>
    <Route index element={<Home />} />
    <Route path={r['auth.login']} element={<Login />} />
    <Route
      path={r['auth.register']}
      element={
        <RequireGuest>
          <Register />
        </RequireGuest>
      }
    />
  </Route>,
]
