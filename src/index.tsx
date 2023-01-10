import { createRoot } from 'react-dom/client'
import { lazy, Suspense, useState } from 'react'
import { persistor, store } from './app/redux'

import {
  MantineProvider,
  ColorSchemeProvider,
  ColorScheme,
  createEmotionCache,
} from '@mantine/core'
import { NotificationsProvider } from '@mantine/notifications'
import { useColorScheme } from '@mantine/hooks'
import '../src/public/css/main.css'
import { setupAxios } from 'app/api/axios'
import { ModalsProvider } from '@mantine/modals'
import { SpinnerOverlay } from 'components/common/layout'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

const App = lazy(() => import('App'))

setupAxios()

const container = document.getElementById('root') as HTMLDivElement
const root = createRoot(container)

const emotionCache = createEmotionCache({ key: 'x', prepend: false })

const Root = () => {
  const preferredColorScheme = useColorScheme()
  const [colorScheme, setColorScheme] =
    useState<ColorScheme>(preferredColorScheme)
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'))

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ColorSchemeProvider
          colorScheme={colorScheme}
          toggleColorScheme={toggleColorScheme}
        >
          <MantineProvider
            emotionCache={emotionCache}
            theme={{
              fontFamily: 'Poppins',
              colorScheme,
              primaryColor: 'blue',
              components: {
                Container: {
                  defaultProps: {
                    sizes: {
                      xs: 540,
                      sm: 640,
                      md: 768,
                      lg: 1024,
                      xl: 1280,
                      '2xl': 1536,
                    },
                  },
                },
              },
            }}
          >
            <NotificationsProvider>
              <ModalsProvider>
                <Suspense fallback={<SpinnerOverlay />}>
                  <App />
                </Suspense>
              </ModalsProvider>
            </NotificationsProvider>
          </MantineProvider>
        </ColorSchemeProvider>
      </PersistGate>
    </Provider>
  )
}

root.render(<Root />)
