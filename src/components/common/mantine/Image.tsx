import { createStyles } from '@mantine/core'
import { Image as MantineImage } from '@mantine/core'
import { ImageProps as MantineImageProps } from '@mantine/core'

const useStyles = createStyles(() => ({
  imageWrapper: {
    height: 'inherit',
  },

  figure: {
    height: 'inherit',
  },
}))

type ImageProps = {
  withBoxSize?: boolean
} & MantineImageProps

export const Image = ({ children, withBoxSize, ...props }: ImageProps) => {
  const { classes } = useStyles()

  //doesn't look well, temp solution
  if (withBoxSize)
    return (
      <MantineImage
        classNames={{
          figure: classes.figure,
          imageWrapper: classes.imageWrapper,
        }}
        {...props}
      >
        {children}
      </MantineImage>
    )

  return <MantineImage {...props}>{children}</MantineImage>
}
