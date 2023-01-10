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
      //is Table Data Cell - if it is the text gonna be gray
      tdc?: boolean
    } & MantineTextProps)
  | Partial<Record<string, object | string>>

//TODO: add gray shades for light and dark theme
export const Text = ({ withEllipsis = false, tdc, ...props }: TextProps) => {
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
  else if (tdc)
    return (
      <MantineText
        color="#7E8299"
        className={cx({ [classes.overflowWithElipsis]: withEllipsis })}
        {...props}
      ></MantineText>
    )

  return (
    <MantineText
      className={cx({ [classes.overflowWithElipsis]: withEllipsis })}
      {...props}
    ></MantineText>
  )
}
