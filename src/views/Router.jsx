import { BrowserRouter, Routes } from 'react-router-dom'
import { publicRoutes } from './public/@Routes'
import { reportRoutes } from './reports/@Routes'

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>{publicRoutes}</Routes>
      <Routes>{reportRoutes}</Routes>
    </BrowserRouter>
  )
}

export default AppRouter
