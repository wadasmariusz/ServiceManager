import { Tabs } from '@mantine/core'
import AccessibilityForm from 'components/admin-panel/accessibility/AccessibilityForm'

const ViewAccessibility = () => {
  return (
    <Tabs defaultValue="accessibility">
      <Tabs.List>
        <Tabs.Tab value="accessibility">Dostępność</Tabs.Tab>
        <Tabs.Tab value="shedule">Twój harmonogram</Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value="accessibility" pt="xs">
        <AccessibilityForm />
      </Tabs.Panel>

      <Tabs.Panel value="shedule" pt="xs">
        Twój harmonogram
      </Tabs.Panel>
    </Tabs>
  )
}

export default ViewAccessibility
