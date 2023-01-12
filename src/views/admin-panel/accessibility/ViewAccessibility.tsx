import { Tabs } from '@mantine/core'

const ViewAccessibility = () => {
  return (
    <Tabs defaultValue="accessibility">
      <Tabs.List>
        <Tabs.Tab value="accessibility">Dostępność</Tabs.Tab>
        <Tabs.Tab value="shedule">Twój harmonogram</Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value="accessibility" pt="xs">
        Dostępność
      </Tabs.Panel>

      <Tabs.Panel value="shedule" pt="xs">
        Twój harmonogram
      </Tabs.Panel>
    </Tabs>
  )
}

export default ViewAccessibility
