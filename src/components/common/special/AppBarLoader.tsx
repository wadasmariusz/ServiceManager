import { createStyles, keyframes } from '@mantine/core'

export const loading = keyframes({
  '0%, 1%': { transform: 'translateX(-100%)' },
  '100%': { transform: 'translateX(125%)' },
})

const useStyles = createStyles((theme) => ({
  barLoaderWrapper: {
    width: '100vw',
    height: 2,
    position: 'fixed',
    zIndex: 9999,
    top: 0,
    left: 0,
  },

  barLoader: {
    width: '50%',
    height: '100%',
    background: theme.fn.linearGradient(
      90,
      'white',
      theme.fn.primaryColor(),
      'white',
    ),
  },

  animateLoading: {
    animation: `${loading} 1.5s linear infinite`,
  },
}))

export const AppBarLoader = () => {
  const { classes, cx } = useStyles()

  return (
    <div className={classes.barLoaderWrapper}>
      <div className={cx(classes.barLoader, classes.animateLoading)}></div>
    </div>
  )
}
