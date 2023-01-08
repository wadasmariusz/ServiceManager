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
}
