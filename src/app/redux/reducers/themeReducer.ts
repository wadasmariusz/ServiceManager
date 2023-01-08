import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { ActionType } from '../action-types'
import { SetWcagAction } from '../actions'

type ThemeStateType = {
  theme:
    | 'theme_light_mode'
    | 'theme_dark_mode'
    | 'theme_black_white'
    | 'theme_yellow_black'
    | 'theme_black_yellow'
  fontSize: 'text_size_regular' | 'text_size_large' | 'text_size_extra_large'
}

const initialState: ThemeStateType = {
  theme: 'theme_light_mode',
  fontSize: 'text_size_regular',
}

const reducer = (
  state: ThemeStateType = initialState,
  action: SetWcagAction,
): ThemeStateType => {
  switch (action.type) {
    case ActionType.SET_THEME:
      return { ...state, theme: action.payload }
    case ActionType.SET_FONT_SIZE:
      return { ...state, fontSize: action.payload }
    default:
      return state
  }
}

const persistConfig = {
  key: 'app.pigener.theme',
  storage,
}

export const themeReducer = persistReducer(persistConfig, reducer)
