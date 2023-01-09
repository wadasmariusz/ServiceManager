import React from 'react'

import { createStyles } from '@mantine/core'

import { PublicHeader } from 'components/common/layout'

const useStyles = createStyles(() => ({
  main: {
    marginTop: 'var(--mantine-header-height)',
  },
}))

type TemplateMainProps = {
  children: React.ReactNode
  title?: string
  withoutFooter?: boolean
}

export const TemplatePublicView: React.FC<TemplateMainProps> = ({
  children,
}) => {
  const { classes } = useStyles()

  return (
    <div className={'flex min-h-screen w-full flex-col'}>
      <PublicHeader />

      <main className={`relative h-full w-full ${classes.main}`}>
        <div className={'w-full'}>{children}</div>
      </main>
    </div>
  )
}
