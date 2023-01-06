import { Anchor, Breadcrumbs, Group, Text } from '@mantine/core'
import { ReactNode, useMemo } from 'react'
import { HiChevronRight, HiOutlineHome } from 'react-icons/hi'
import { Link, To } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { APP_NAME } from 'app/config/env'
import { r } from 'app/router'

export interface BreadcrumbItem {
  title: string
  href?: To
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
  separator?: ReactNode
  children?: ReactNode
}

export const Breadcrumb = ({
  items,
  separator = <HiChevronRight />,
}: BreadcrumbProps) => {
  const title = items.length === 0 ? null : items[items.length - 1].title
  const breadcrumbItems = useMemo(
    () => [
      <Anchor key={'home'} component={Link} to={r['index']}>
        <HiOutlineHome color="currentColor" />
      </Anchor>,
      ...items.map(({ title, href }, idx) => {
        if (href)
          return (
            <Anchor key={idx} component={Link} to={href}>
              {title}
            </Anchor>
          )
        else return <Text key={idx}>{title}</Text>
      }),
    ],
    [items],
  )

  return (
    <>
      <Helmet>
        <title>{title ? `${title} | ${APP_NAME}` : APP_NAME}</title>
      </Helmet>
      <Group position="apart">
        <Breadcrumbs separator={separator}>{breadcrumbItems}</Breadcrumbs>
      </Group>
    </>
  )
}
