import { Text } from 'components/common/mantine/Text'

import { Box } from '@mantine/core'

import { FaDove } from 'react-icons/fa'

export const ViewAdminDashboard = () => {
  return (
    <Box
      sx={(theme) => ({
        color: theme.colors.gray['1'],
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      })}
    >
      <Text size={150} weight={'bold'} mb={'xl'}>
        Admin Panel
      </Text>

      <FaDove size={200} />
    </Box>
  )
}
