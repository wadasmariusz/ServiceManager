import { Box } from '@mantine/core'
import { Title as MantineTitle } from '@mantine/core'
import { TitleProps as MantineTitleProps } from '@mantine/core'
import { createStyles } from '@mantine/core'

const useStyles = createStyles(() => ({
  overflowWithElipsis: {
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
  },
}))

type TitleProps = {
  text?: string
  withEllipsis?: boolean
} & MantineTitleProps

export const Title = ({
  text,
  withEllipsis = true,
  children,
  ...props
}: TitleProps) => {
  const { classes, cx } = useStyles()

  if (withEllipsis)
    return (
      <Box sx={{ overflow: 'hidden' }}>
        <MantineTitle
          className={cx({ [classes.overflowWithElipsis]: withEllipsis })}
          {...props}
        >
          {text ? text : children}
        </MantineTitle>
      </Box>
    )

  return (
    <MantineTitle
      className={cx({ [classes.overflowWithElipsis]: withEllipsis })}
      {...props}
    >
      {text ? text : children}
    </MantineTitle>
  )
}
