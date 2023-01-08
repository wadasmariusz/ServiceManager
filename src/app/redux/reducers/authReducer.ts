import { ActionType } from '../action-types'
import { SetAuthStoreAction } from '../actions'
import { LoginResponse } from 'app/api'

export type AuthStoreType = LoginResponse

export const initialAuthState: AuthStoreType = {
  userId: '',
  email: '',
  role: '',
  state: '',
  createdAt: null,
  permissions: [],
}

const reducer = (
  state: AuthStoreType = initialAuthState,
  action: SetAuthStoreAction,
): AuthStoreType => {
  switch (action.type) {
    case ActionType.SET_AUTH_STORE:
      return { ...state, ...action.payload }
    default:
      return state
  }
}

export const authReducer = reducer
