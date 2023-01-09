import { BrowserRouter, Routes } from 'react-router-dom'
import { publicRoutes } from './public/@Routes'
import { reportRoutes } from './reports/@Routes'
import { adminPanelRoutes } from './admin-panel/@Routes'

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        {publicRoutes},{reportRoutes},{adminPanelRoutes}
      </Routes>
    </BrowserRouter>
  )
}

export default AppRouter
