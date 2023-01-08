import React, { useState, Suspense } from 'react'
import { Outlet } from 'react-router-dom'

import { adminPanelSideNavigationConfig } from 'app/config/sideNavigationConfig'
import { useTypedSelector } from 'app/hooks/useTypedSelector'

import { AppBarLoader } from 'components/common/special/AppBarLoader'
import { SideNavigation } from 'components/common/navigation/SideNavigation'
import { PanelHeader } from 'components/common/header/PanelHeader'

const TemplateAdminPanel: React.FC = () => {
  const [isNavHidden, setIsNavHidden] = useState(true)
  const toggleSideNav = () => setIsNavHidden((prev) => !prev)

  const theme = useTypedSelector((state) => state.theme.theme)
  const chooseTheme = () => {
    switch (theme) {
      case 'theme_light_mode': {
        return '#f5f7f9'
      }
      case 'theme_dark_mode': {
        return '#1A1B1E'
      }
      case 'theme_black_white': {
        return '#000'
      }
      case 'theme_black_yellow': {
        return '#000'
      }
      case 'theme_yellow_black': {
        return '#c7c700'
      }
    }
  }

  return (
    <>
      <PanelHeader toggleNav={toggleSideNav} />

      <SideNavigation
        width="w-64"
        navConfig={adminPanelSideNavigationConfig}
        hidden={isNavHidden}
        toggleNav={toggleSideNav}
      />

      <div
        className={`min-h-screen pt-24 lg:pl-64`}
        style={{ backgroundColor: chooseTheme() }}
      >
        <div className="px-2 pt-10 pb-12 md:px-4">
          <div className="m-auto max-w-7xl">
            <Suspense fallback={<AppBarLoader />}>
              <Outlet />
            </Suspense>
          </div>
        </div>
      </div>
    </>
  )
}

export default TemplateAdminPanel
