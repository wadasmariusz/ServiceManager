import { routes } from 'app/router'
import { Link } from 'react-router-dom'

import DOMPurify from 'dompurify'

// import { useParams } from 'react-router-dom'
// import { useGetService } from 'app/api/admin/users/getUser'

import { Breadcrumb } from 'components/common/layout'

import { Button, Card, createStyles, Group, Stack, Text } from '@mantine/core'

import { service } from 'app/mocks/services/service'
import { AiOutlineEdit } from 'react-icons/ai'

const useStyles = createStyles(() => ({
  defaultStyles: {
    h1: { fontSize: '32px', fontWeight: 500 },
    h2: { fontSize: '24px', fontWeight: 500 },
    h3: { fontSize: '18px', fontWeight: 500 },
    h4: { fontSize: '16px', fontWeight: 500 },
    h5: { fontSize: '13px', fontWeight: 500 },
    h6: { fontSize: '11px', fontWeight: 500 },
  },
}))

const ViewSingleService = () => {
  //   const { serviceId } = useParams()

  //   const query = useGetService(serviceId)
  //   const service = query.data

  const { classes } = useStyles()

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
            {/* <Stack spacing="xs"> */}
            <Text inline fw={500}>
              Opis:
            </Text>
            <Text
              className={classes.defaultStyles}
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(service.description),
              }}
            ></Text>
            {/* </Stack> */}
          </Stack>
        </Card.Section>
      </Card>
    </>
  )
}

export default ViewSingleService
