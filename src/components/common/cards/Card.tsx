import React from 'react'

import { createStyles } from '@mantine/core'
import { Card as MantineCard } from '@mantine/core'
import { CardProps as MantineCardProps } from '@mantine/core'

import { useMediaQuery } from '@mantine/hooks'
import { useMantineTheme } from '@mantine/core'

const useStyles = createStyles((theme) => ({
  card: {
    display: 'flex',
    width: '100%',
    boxShadow: '0 5px 60px rgba(128, 128, 128, 0.2)',
  },

  //doesnt work
  [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
    padding: theme.spacing['sm'],
  },
}))

export type CardProps = {
  className?: string
  shadow?: boolean
} & Omit<MantineCardProps, 'className' | 'shadow'>

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  shadow = true,
  ...props
}) => {
  const { classes } = useStyles()

  const theme = useMantineTheme()
  const largeScreen = useMediaQuery(`(min-width: ${theme.breakpoints['sm']}px)`)
  const p = largeScreen ? 'lg' : 'md'

  return (
    <MantineCard
      radius={'lg'}
      p={p}
      className={`${classes.card} ${className}`}
      {...props}
    >
      {children}
    </MantineCard>
  )
}
