import { BASE_URL } from 'app/config/env'

export const adminRoutes = {
  //ADMIN PANEL
  'admin-panel': `${BASE_URL}/panel-administratora`,

  //DASHBOARD
  'admin-panel.dashboard': `${BASE_URL}/panel-administratora/dashboard`,

  //USERS
  'admin-panel.users': `${BASE_URL}/panel-administratora/uzytkownicy`,
  'admin-panel.user': (userId = ':userId') =>
    `${BASE_URL}/panel-administratora/uzytkownik/${userId}`,

  //SERVICES
  'admin-panel.services': `${BASE_URL}/panel-administratora/uslugi`,
  // 'admin-panel.service': (serviceId = ':serviceId') =>
  //   `${BASE_URL}/panel-administratora/uslugi/${serviceId}`,
  'admin-panel.service': `${BASE_URL}/panel-administratora/uslugi/serviceId`,

  // 'admin-panel.services.edit-service': (serviceId = ':serviceId') =>
  //   `${BASE_URL}/panel-administratora/uslugi/${serviceId}/edycja`,
  'admin-panel.services.edit-service': `${BASE_URL}/panel-administratora/uslugi/serviceId/edycja`,

  'admin-panel.services.add-service': `${BASE_URL}/panel-administratora/uslugi/dodaj-usluge`,

  //AVAILABILITY
  'admin-panel.availability': `${BASE_URL}/panel-administratora/dostepnosc`,
}
