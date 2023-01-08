import axios from 'axios'
import { API_URL } from 'app/config/env'

export const logout = () =>
  axios({
    method: 'DELETE',
    url: `${API_URL}/accounts/sign-out`,
  })
