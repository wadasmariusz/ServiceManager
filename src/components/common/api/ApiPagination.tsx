import { Pagination, PaginationProps } from '@mantine/core'
import { useQueryContext } from 'app/context'
import { useSearchParams } from 'react-router-dom'

export const ApiPagination = (props: Omit<PaginationProps, 'total'>) => {
  const { pagination } = useQueryContext()
  const [searchParams, setSearchParams] = useSearchParams()
  const params = Object.fromEntries(searchParams)

  const handleChange = (page: number) => {
    setSearchParams({ ...params, pageNumber: page.toString() })
  }

  if (pagination && pagination.totalPages && pagination.totalPages > 1)
    return (
      <Pagination
        mt={'lg'}
        align={'center'}
        total={pagination.totalPages ?? 1}
        initialPage={pagination.pageIndex ?? 1}
        onChange={handleChange}
        {...props}
      />
    )
  else return null
}
