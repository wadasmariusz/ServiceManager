import React from 'react'
import { Link } from 'react-router-dom'
import { Button as MantineButton } from '@mantine/core'
import { ButtonProps as MantineButtonProps } from '@mantine/core'

type ButtonLinkProps = {
  to: string
  text?: string
} & MantineButtonProps

export const ButtonLink = ({
  to,
  text,
  children,
  ...props
}: ButtonLinkProps) => {
  return (
    <MantineButton component={Link} to={to} radius={'md'} {...props}>
      {children || text}
    </MantineButton>
  )
}
