import { PERMISSION_USER } from 'app/config/permissions'
import { r } from 'app/router'
import { RequireAuth } from 'components/common'
import { lazy } from 'react'
import { Route } from 'react-router-dom'

const PublicLayout = lazy(() => import('layout/Public'))

const ReportList = lazy(() => import('../View_ReportList'))

export const reportRoutes = [
  <Route
    key={r['reports.list']}
    path={r['reports.list']}
    element={
      <RequireAuth roles={[PERMISSION_USER]}>
        <PublicLayout />
      </RequireAuth>
    }
  >
    <Route index element={<ReportList />} />
  </Route>,
]
