import { LoginResponse } from 'app/api'
import { revokeToken, setupAxios } from 'app/api/axios'
import { PERMISSION_GUEST } from 'app/config/permissions'
import create from 'zustand'

export interface AuthStore {
  userId: number | null
  email: string | null
  roles: string[] | null
  setAuthState: ({ userId, email, roles }: LoginResponse) => void
  clearAuthState: () => void
}

export const useAuth = create<AuthStore>((set) => ({
  userId: null,
  email: null,
  roles: [PERMISSION_GUEST],
  setAuthState: ({ userId, email, roles, accessToken }: LoginResponse) => {
    setupAxios(accessToken)
    set({ userId, email, roles })
  },
  clearAuthState: () => {
    revokeToken()
    set({ userId: null, email: null, roles: [PERMISSION_GUEST] })
  },
}))
