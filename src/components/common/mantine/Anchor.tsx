import { PolymorphicComponentProps } from '@mantine/utils'
import { Anchor as MantineAnchor } from '@mantine/core'
import { AnchorProps as MantineAnchorProps } from '@mantine/core'
import { Link } from 'react-router-dom'

type AnchorProps<C> = {
  text?: string
} & PolymorphicComponentProps<C, MantineAnchorProps>

export const Anchor = <C = 'a',>({
  text,
  children,
  ...props
}: AnchorProps<C>) => {
  return (
    <MantineAnchor target="_blank" {...props}>
      {children ?? text}
    </MantineAnchor>
  )
}

type AnchorLinkProps<C> = {
  text?: string
} & PolymorphicComponentProps<C, MantineAnchorProps>

export const AnchorLink = ({
  text,
  children,
  component = Link,
  ...props
}: AnchorLinkProps<typeof Link>) => {
  //TODO: read and add preventScrollReset={true}
  return (
    <MantineAnchor component={component} {...props}>
      {children ?? text}
    </MantineAnchor>
  )
}
