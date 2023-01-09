import { Report, useGetReports } from 'app/api'
import { PaginatedQueryHasNoResults } from 'app/context/PaginatedQueryHasNoResults'
import { PaginatedQueryHasResults } from 'app/context/PaginatedQueryHasResults'
import { PaginatedQueryProvider } from 'app/context/PaginatedQueryProvider'

import { Alert } from '@mantine/core'

import { Breadcrumb } from 'components/common/layout'

const breadcrumbItems = [{ label: 'Reports' }]

const ReportList = () => {
  const queryData = useGetReports()

  return (
    <PaginatedQueryProvider<Report> {...queryData}>
      <Breadcrumb items={breadcrumbItems} />
      <PaginatedQueryHasResults>
        {(data: Report[]) => (
          <ul className="mt-10">
            {data.map((item) => (
              <li key={item.id}>{item.title}</li>
            ))}
          </ul>
        )}
      </PaginatedQueryHasResults>
      <PaginatedQueryHasNoResults>
        <Alert color={'red'}>NO RESULTS</Alert>
      </PaginatedQueryHasNoResults>
    </PaginatedQueryProvider>
  )
}
export default ReportList
