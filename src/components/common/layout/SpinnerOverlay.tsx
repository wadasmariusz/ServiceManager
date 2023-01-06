import { Loader, Paper } from '@mantine/core'

export const SpinnerOverlay = () => {
  return (
    <Paper
      radius={0}
      aria-busy
      sx={{
        display: 'flex',
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Loader />
    </Paper>
  )
}
