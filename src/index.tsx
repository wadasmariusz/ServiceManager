import { createRoot } from 'react-dom/client'
import { lazy, Suspense, useState } from 'react'
import { Provider } from 'react-redux'
import { store } from './app/redux'
import {
  MantineProvider,
  ColorSchemeProvider,
  ColorScheme,
  createEmotionCache,
} from '@mantine/core'
import { NotificationsProvider } from '@mantine/notifications'
import { useColorScheme } from '@mantine/hooks'
import 'public/css/main.css'
import { setupAxios } from 'app/api/axios'
import { ModalsProvider } from '@mantine/modals'
import { SpinnerOverlay } from 'components/common/layout'

const App = lazy(() => import('App'))

setupAxios(null)

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
    </Provider>
  )
}

root.render(<Root />)
