import { Dispatch } from 'redux'
import { ActionType } from '../action-types'
import { SetThemeAction, SetFontAction, SetAuthStoreAction } from '../actions'

import { initialAuthState } from '../reducers/authReducer'

export const _setTheme = (theme: SetThemeAction['payload']) => {
  return (dispatch: Dispatch<SetThemeAction>) => {
    dispatch({
      type: ActionType.SET_THEME,
      payload: theme,
    })
  }
}

export const _setFont = (fontSize: SetFontAction['payload']) => {
  return (dispatch: Dispatch<SetFontAction>) => {
    dispatch({
      type: ActionType.SET_FONT_SIZE,
      payload: fontSize,
    })
  }
}

export const _setAuthStore = (authData: SetAuthStoreAction['payload']) => {
  return async (dispatch: Dispatch<SetAuthStoreAction>) => {
    dispatch({
      type: ActionType.SET_AUTH_STORE,
      payload: authData,
    })
  }
}

export const _clearAuthStore = () => {
  return (dispatch: Dispatch<SetAuthStoreAction>) => {
    dispatch({
      type: ActionType.SET_AUTH_STORE,
      payload: initialAuthState,
    })
  }
}
