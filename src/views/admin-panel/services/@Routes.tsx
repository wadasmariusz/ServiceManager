import { Route } from 'react-router-dom'
import { routes } from 'app/router'
import ViewServices from './ViewServices'
import ViewSingleService from './ViewSingleService'
import ViewAddService from './ViewAddService'
import ViewEditService from './ViewEditService'

export const AdminPanelServicesRoutes = [
  <Route
    key={routes['admin-panel.services']}
    path={routes['admin-panel.services']}
    element={<ViewServices />}
  />,
  <Route
    // key={routes['admin-panel.service']()}
    // path={routes['admin-panel.service']()}
    key={routes['admin-panel.service']}
    path={routes['admin-panel.service']}
    element={<ViewSingleService />}
  />,
  <Route
    // key={routes['admin-panel.services.edit-service']()}
    // path={routes['admin-panel.services.edit-service']()}
    key={routes['admin-panel.services.edit-service']}
    path={routes['admin-panel.services.edit-service']}
    element={<ViewEditService />}
  />,
  <Route
    key={routes['admin-panel.services.add-service']}
    path={routes['admin-panel.services.add-service']}
    element={<ViewAddService />}
  />,
]
