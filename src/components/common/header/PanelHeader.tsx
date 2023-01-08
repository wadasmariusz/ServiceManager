import React from 'react'

import { Header, Divider } from '@mantine/core'

import { BurgerButton } from 'components/atoms/ui/buttons/BurgerButton'
import UserDropdown from './UserDropdown'

type PanelHeaderProps = {
  toggleNav: () => void
}

export const PanelHeader: React.FC<PanelHeaderProps> = ({ toggleNav }) => {
  return (
    <div className={'fixed z-50 w-full '}>
      <Header height={96}>
        <div className={'hidden h-full px-5 lg:flex'}>
          <PanelHeaderDesktop />
        </div>

        <div className={'flex h-full px-5 lg:hidden'}>
          <PanelHeaderMobile toggleNav={toggleNav} />
        </div>
      </Header>
    </div>
  )
}

const PanelHeaderDesktop = () => {
  return (
    <>
      <div className={'flex h-full w-full items-center justify-end'}>
        <div className={'mr-4 flex justify-end'}>
          <Divider orientation={'vertical'} />

          <Divider orientation={'vertical'} />
        </div>

        <div className={'flex justify-end'}>
          <UserDropdown />
        </div>
      </div>
    </>
  )
}

type PanelHeaderMobileProps = {
  toggleNav: () => void
}

const PanelHeaderMobile = ({ toggleNav }: PanelHeaderMobileProps) => {
  return (
    <>
      {/* HeaderPanel mobile view */}
      <div className={'flex w-full items-center justify-between'}>
        <span>
          <BurgerButton onClick={toggleNav} />
        </span>

        <span>
          <UserDropdown />
        </span>
      </div>
    </>
  )
}
