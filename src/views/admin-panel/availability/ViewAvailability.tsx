import { Tabs } from '@mantine/core'
import AvailabilityForm from 'components/admin-panel/availability/AvailabilityForm'

const ViewAvailability = () => {
  return (
    <Tabs defaultValue="availability" className="bg-white">
      <Tabs.List>
        <Tabs.Tab value="availability">Dostępność</Tabs.Tab>
        <Tabs.Tab value="shedule">Twój harmonogram</Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value="availability" pt={30}>
        <AvailabilityForm />
      </Tabs.Panel>

      <Tabs.Panel value="shedule" pt="xs">
        Twój harmonogram
      </Tabs.Panel>
    </Tabs>
  )
}

export default ViewAvailability
