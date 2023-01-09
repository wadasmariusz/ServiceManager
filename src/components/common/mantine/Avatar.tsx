import {
  Avatar as MantineAvatar,
  AvatarProps as MantineAvatarProps,
} from '@mantine/core'

type TAvatarProps = {
  borderWidth?: number
  circle?: boolean
} & MantineAvatarProps
export const Avatar: React.FC<TAvatarProps> = ({
  src,
  alt,
  borderWidth,
  circle = false,
  ...props
}) => {
  const border = borderWidth ? borderWidth : 0
  const borderRadius = circle ? '50%' : 0
  return (
    <MantineAvatar
      styles={{
        image: {
          borderRadius: borderRadius,
          borderWidth: border,
          borderColor: 'white',
          borderStyle: 'solid',
        },
      }}
      src={src}
      alt={alt}
      {...props}
    />
  )
}
