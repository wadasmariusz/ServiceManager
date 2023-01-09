import { createStore, applyMiddleware, compose } from 'redux'
import rootReducer from './reducers'
import { persistStore } from 'redux-persist'
import thunk from 'redux-thunk'

const composeEnhancers =
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  window?.__REDUX_DEVTOOLS_EXTENSION__
    ? // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      window?.__REDUX_DEVTOOLS_EXTENSION__()
    : // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore

      (f) => f

//TO-DO: remove deprecated create store and use configureStore instead

const store = createStore(
  rootReducer,
  {},
  compose(applyMiddleware(thunk), composeEnhancers),
)

const persistor = persistStore(store)

export { store, persistor }
