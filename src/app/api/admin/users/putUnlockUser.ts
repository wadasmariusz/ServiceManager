import { API_URL } from 'app/config/env'
import axios from 'axios'

export const putUnlockUser = (userId: string | undefined) => {
  if (!userId) return Promise.reject(new Error('userId is undefined or null'))
  return axios({
    method: 'PUT',
    url: `${API_URL}/users/${userId}/active`,
  })
}
