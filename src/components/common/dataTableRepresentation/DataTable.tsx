import { Table } from '@mantine/core'
import { createStyles } from '@mantine/styles'
import { ReactNode } from 'react'
import { Text } from '../mantine/Text'

const useStyles = createStyles(() => ({
  tableContainer: {
    background: 'white',
    boxShadow: '0 5px 60px rgb(128 128 128 / 20%)',
    borderRadius: '16px',
  },
}))

type DataTableProps = {
  headers: { id: string; label: string }[]
  children: ReactNode
  className?: string
}

const DataTable = ({ headers, children, className }: DataTableProps) => {
  const { classes } = useStyles()
  return (
    <div
      className={classes.tableContainer + ' overflow-x-scroll md:overflow-auto'}
    >
      <Table
        align="center"
        fontSize="sm"
        verticalSpacing="md"
        horizontalSpacing="md"
        className={`${
          className && className
        } overflow-x-scroll md:overflow-auto`}
      >
        <thead>
          <tr className="overflow-x-scroll md:overflow-auto">
            {headers.map(({ id, label }) => (
              <th key={id}>
                <Text>{label}</Text>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </Table>
    </div>
  )
}

export default DataTable
