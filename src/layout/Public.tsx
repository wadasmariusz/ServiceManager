import { Outlet } from 'react-router-dom'
import { Paper, Container } from '@mantine/core'
import { Suspense } from 'react'
import { PublicHeader, SpinnerOverlay } from 'components/common/layout'

const Public = () => {
  return (
    <Paper radius={0} className="grow">
      <PublicHeader />
      <Container size={'xl'} className="h-full" mb={'lg'}>
        <Suspense fallback={<SpinnerOverlay />}>
          <Outlet />
        </Suspense>
      </Container>
    </Paper>
  )
}

export default Public
