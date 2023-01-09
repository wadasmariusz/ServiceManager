import { Box } from '@mantine/core'
import { Text as MantineText } from '@mantine/core'
import { TextProps as MantineTextProps } from '@mantine/core'
import { createStyles } from '@mantine/core'

const useStyles = createStyles(() => ({
  overflowWithElipsis: {
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
  },
}))

type TextProps =
  | ({
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      component?: any
      withEllipsis?: boolean
    } & MantineTextProps)
  | Partial<Record<string, object | string>>

//TODO: add gray shades for light and dark theme
export const Text = ({ withEllipsis = false, ...props }: TextProps) => {
  const { classes, cx } = useStyles()

  if (withEllipsis)
    return (
      <Box sx={{ overflow: 'hidden' }}>
        <MantineText
          className={cx({ [classes.overflowWithElipsis]: withEllipsis })}
          {...props}
        ></MantineText>
      </Box>
    )

  return (
    <MantineText
      className={cx({ [classes.overflowWithElipsis]: withEllipsis })}
      {...props}
    ></MantineText>
  )
}
