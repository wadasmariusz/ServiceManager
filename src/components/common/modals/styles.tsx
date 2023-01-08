import { createStyles } from '@mantine/core'

export const useModalStyles = createStyles((theme) => ({
  body: {
    display: 'flex',
    flexDirection: 'column',
    rowGap: '1.5rem',
    maxWidth: '36rem',
  },

  bodyContent: {
    display: 'flex',
    columnGap: '1.5rem', //1rem = 16px
    alignItems: 'center',
  },

  bodyButtons: {
    display: 'flex',
    justifyContent: 'end',
    alignItems: 'center',
    columnGap: '1rem',
    marginTop: '1.25rem',
  },

  iconWrapper: {
    width: '75px',
    height: '75px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '100%',
    backgroundColor: theme.fn.variant({
      variant: 'light',
      color: theme.primaryColor,
    }).background,
  },

  icon: {
    color: theme.fn.variant({ variant: 'light', color: theme.primaryColor })
      .color,
  },
}))
