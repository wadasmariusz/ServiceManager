import { ReactNode } from 'react'

import { useQueryContext } from './PaginatedQueryProvider'

import { Card } from 'components/common/cards/Card'
import { Text } from 'components/common/mantine/Text'

type QueryHasNoResultsProps = {
  children?: (() => JSX.Element) | JSX.Element | ReactNode
}

export function PaginatedQueryHasNoResults<T>({
  children,
}: QueryHasNoResultsProps) {
  const queryData = useQueryContext<T>()

  return (
    <>
      {queryData?.status === 'success' &&
      Array.isArray(queryData.data) &&
      queryData.data.length === 0
        ? typeof children === 'function'
          ? children()
          : children || (
              <Card>
                <Text mx={'auto'}>Brak wyników do wyświetlenia</Text>
              </Card>
            )
        : null}
    </>
  )
}
