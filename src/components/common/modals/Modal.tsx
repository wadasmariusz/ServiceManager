import { useMantineTheme } from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'

import { Modal as MantineModal } from '@mantine/core'
import { ModalProps as MantineModalProps } from '@mantine/core'

export type ModalProps = MantineModalProps

export const Modal = ({ children, ...props }: ModalProps) => {
  const theme = useMantineTheme()
  const largeScreen = useMediaQuery(`(min-width: ${theme.breakpoints['sm']}px)`)
  const p = largeScreen ? 'lg' : 'md'

  //TODO: useEffectLayout and overflow: hidden on body tag

  return (
    <MantineModal centered radius={'lg'} padding={p} {...props}>
      {children}
    </MantineModal>
  )
}
