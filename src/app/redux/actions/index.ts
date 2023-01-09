import { ActionType } from '../action-types'

//payload types
import { AuthStoreType } from '../reducers/authReducer'

export type SetThemeAction = {
  type: ActionType.SET_THEME
  payload:
    | 'theme_light_mode'
    | 'theme_dark_mode'
    | 'theme_black_white'
    | 'theme_yellow_black'
    | 'theme_black_yellow'
}

export type SetFontAction = {
  type: ActionType.SET_FONT_SIZE
  payload: 'text_size_regular' | 'text_size_large' | 'text_size_extra_large'
}

export type SetWcagAction = SetThemeAction | SetFontAction

export type SetAuthStoreAction = {
  type: ActionType.SET_AUTH_STORE
  payload: AuthStoreType
}
