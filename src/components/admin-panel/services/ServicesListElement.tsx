import { Link } from 'react-router-dom'
import { routes } from 'app/router'

import { createStyles } from '@mantine/styles'
import { Text } from 'components/common/mantine/Text'

import { TServiceItem } from 'app/api/admin/services/getServices'

import { shortenString } from 'components/common/special/ShortenString'
import { Group } from '@mantine/core'

const useStyles = createStyles(() => ({
  link: {
    display: 'block',
    cursor: 'pointer',
    '&:hover': {
      color: '#228be6',
    },
  },
  inline: {
    display: 'inline',
  },
}))

interface IService {
  service: TServiceItem
}

const ServicesListElement = ({ service }: IService) => {
  const { classes } = useStyles()

  return (
    <>
      <tr>
        <td>
          <Text
            component={Link}
            // to={routes['admin-panel.service'](service?.serviceId)}
            to={routes['admin-panel.service']}
            className={classes.link}
          >
            {service.name}
          </Text>
        </td>
        <td>
          <Text tdc>{shortenString(service.description, 50)}</Text>
        </td>
        <td>
          <Group spacing={5}>
            <Text tdc>{service.duration}</Text>
            <Text tdc>min</Text>
          </Group>
        </td>
        <td>
          <Group spacing={5}>
            <Text tdc>{service.amount}</Text>
            <Text color="dimmed">{service.currency}</Text>
          </Group>
        </td>
        <td>
          <Text tdc>{service.dietitian}</Text>
        </td>
      </tr>
    </>
  )
}

export default ServicesListElement
