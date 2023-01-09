import React from 'react'
import { Burger, BurgerProps } from '@mantine/core'

type BurgerButtonProps = Partial<BurgerProps>

export const BurgerButton: React.FC<BurgerButtonProps> = ({
  onClick,
  opened = false,
}) => {
  //const title = opened ? 'Close navigation' : 'Open navigation'
  return <Burger opened={opened} onClick={onClick} />
}
