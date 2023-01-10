import { routes } from 'app/router'
import { Link } from 'react-router-dom'

// import { useParams } from 'react-router-dom'
// import { useGetService } from 'app/api/admin/users/getUser'

import { Breadcrumb } from 'components/common/layout'

import { Button, Card, Group, Stack, Text } from '@mantine/core'

import { service } from 'app/mocks/services/service'
import { AiOutlineEdit } from 'react-icons/ai'

const ViewSingleService = () => {
  //   const { serviceId } = useParams()

  //   const query = useGetService(serviceId)
  //   const service = query.data

  const breadcrumbItems = [
    {
      label: 'Usługi',
      url: routes['admin-panel.services'],
    },
    {
      label: `${service?.name}`,
      // url: routes['admin-panel.service'](service.serviceId),
      url: routes['admin-panel.service'],
    },
  ]

  return (
    <>
      <Breadcrumb items={breadcrumbItems} />
      <Card
        style={{
          background: 'white',
          boxShadow: '0 5px 60px rgb(128 128 128 / 20%)',
          borderRadius: '16px',
        }}
      >
        <Card.Section className="min-h-[100px]">
          <Stack p={20}>
            <Group position="apart">
              <Text size="lg" weight={600}>
                {service.name}
              </Text>
              <Button
                component={Link}
                // to={routes['admin-panel.services.edit-service'](serviceId)}
                to={routes['admin-panel.services.edit-service']}
              >
                <AiOutlineEdit size={20} />
                Edytuj
              </Button>
            </Group>
            <Group spacing="xs">
              <Text inline fw={500}>
                Czas trwania:
              </Text>
              <Text color="dimmed">{service.duration + ' min'}</Text>
            </Group>
            <Group spacing="xs">
              <Text inline fw={500}>
                Cena:
              </Text>
              <Text color="dimmed">
                {service.amount + ' ' + service.currency}
              </Text>
            </Group>
            <Group spacing="xs">
              <Text inline fw={500}>
                Dietetyk:
              </Text>
              <Text color="dimmed">{service.dietitian}</Text>
            </Group>
            <Group spacing="xs">
              <Text inline fw={500}>
                Opis:
              </Text>
              <Text color="dimmed">{service.description}</Text>
            </Group>
          </Stack>
        </Card.Section>
      </Card>
    </>
  )
}

export default ViewSingleService
