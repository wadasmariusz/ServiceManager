import React from 'react'

import { List as MantineList } from '@mantine/core'
import { ListProps as MantineListProps } from '@mantine/core'

type ListProps = {
  items: React.ReactNode[]
} & Omit<MantineListProps, 'children'>

export const List = ({ items, type, ...props }: ListProps) => {
  return (
    <MantineList
      style={{ listStyleType: type === 'ordered' ? 'decimal' : 'initial' }}
      {...props}
    >
      {items.map((item, id) => (
        <MantineList.Item key={id}>{item}</MantineList.Item>
      ))}
    </MantineList>
  )
}
