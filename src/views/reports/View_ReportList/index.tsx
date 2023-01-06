import { Alert } from '@mantine/core'
import { Report, useGetReports } from 'app/api'
import { QueryHasNoResults, QueryHasResults, QueryProvider } from 'app/context'
import { Breadcrumb } from 'components/common/layout'

const breadcrumbItems = [{ title: 'Reports' }]

const ReportList = () => {
  const queryData = useGetReports()

  return (
    <QueryProvider<Report> {...queryData}>
      <Breadcrumb items={breadcrumbItems} />
      <QueryHasResults>
        {(data: Report[]) => (
          <ul className="mt-10">
            {data.map((item) => (
              <li key={item.id}>{item.title}</li>
            ))}
          </ul>
        )}
      </QueryHasResults>
      <QueryHasNoResults>
        <Alert color={'red'}>NO RESULTS</Alert>
      </QueryHasNoResults>
    </QueryProvider>
  )
}
export default ReportList
