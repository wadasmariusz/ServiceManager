import React from 'react'
import { Link } from 'react-router-dom'

import { createStyles } from '@mantine/core'
import { Anchor } from '@mantine/core'
import { Text } from '@mantine/core'

import { APP_NAME } from 'app/config/env'

import { HiChevronDoubleRight } from 'react-icons/hi'
import { Helmet } from 'react-helmet'

const useStyles = createStyles((theme) => ({
  item: {
    fontWeight: 'bold',

    '&:hover': {
      textDecoration: 'none',
    },
  },

  currentItem: {
    color:
      theme.colorScheme === 'light'
        ? theme.colors.gray[6]
        : theme.colors.gray[6],

    '&:hover': {
      cursor: 'default',
    },
  },

  previousItem: {
    color:
      theme.colorScheme === 'light'
        ? theme.colors.gray[8]
        : theme.colors.gray[8],

    '&:hover': {
      color: theme.colorScheme === 'light' ? theme.black : theme.black,
      cursor: 'pointer',
    },
  },

  chevronItem: {
    margin: '0px 4px',
  },
}))

type BreadcrumbProps = {
  items: BreadcrumbItem[]
  children?: React.ReactNode
}

export const Breadcrumb = ({ items, children }: BreadcrumbProps) => {
  const title = items.length === 0 ? null : items[items.length - 1].label

  return (
    <>
      <Helmet>
        <title>{title ? `${title} | ${APP_NAME}` : APP_NAME}</title>
      </Helmet>

      <div className="flex items-center justify-between pb-6">
        {/* left side */}
        <div>
          {items.map(({ label = '', url = '' }, i) => (
            <BreadcrumbItem
              key={i + label}
              url={url}
              hasChevron={i != items.length - 1}
            >
              {label}
            </BreadcrumbItem>
          ))}
        </div>

        {/* right side */}
        <div className="flex gap-x-5">{children}</div>
      </div>
    </>
  )
}

export type BreadcrumbItem = {
  label?: string
  url?: string
  hasChevron?: boolean
  children?: React.ReactNode
}

const BreadcrumbItem: React.FC<BreadcrumbItem> = ({
  url,
  hasChevron,
  children,
}) => {
  const { classes } = useStyles()

  return (
    <li className="inline-flex items-center">
      <div className="flex items-center">
        {url && hasChevron && (
          <Anchor
            component={Link}
            to={url}
            className={`${classes.item} ${classes.previousItem}`}
            size={'sm'}
          >
            {children}
          </Anchor>
        )}

        {url && !hasChevron && (
          <Text
            className={`${classes.item} ${classes.currentItem}`}
            size={'sm'}
          >
            {children}
          </Text>
        )}

        {!url && (
          <Text
            className={`${classes.item} ${classes.currentItem}`}
            size={'sm'}
          >
            {children}
          </Text>
        )}

        {hasChevron && (
          <Text className={classes.chevronItem} size={'sm'}>
            <HiChevronDoubleRight />
          </Text>
        )}
      </div>
    </li>
  )
}
