import { routes } from 'app/router'

//MOCK-DATA
import { services } from 'app/mocks/services/services'

// import {
//   useGetServices,
//   TServiceItem,
// } from 'app/api/admin/services/getServices'

import ServicesListTable from '../../../components/admin-panel/services/ServicesListTable'

// import { PaginatedQueryProvider } from 'app/context'
// import { PaginatedQueryHasResults } from 'app/context/PaginatedQueryHasResults'
// import { PaginatedQueryHasNoResults } from 'app/context/PaginatedQueryHasNoResults'

import { Breadcrumb } from 'components/common/layout'

import { Stack, Button } from '@mantine/core'
import { SearchFilters } from 'components/common/filtration/SearchFilters'

import { AiOutlinePlus } from 'react-icons/ai'
import { Link } from 'react-router-dom'

const ViewServices = () => {
  const breadcrumbItems = [
    { label: 'Usługi', url: routes['admin-panel.services'] },
  ]

  //   const query = useGetServices()

  return (
    <Stack>
      <Breadcrumb items={breadcrumbItems} />
      {/* <PaginatedQueryProvider<TServiceItem> {...query}> */}
      <SearchFilters />
      <Button component={Link} to={routes['admin-panel.services.add-service']}>
        <AiOutlinePlus />
        Dodaj usługę
      </Button>
      {/* <PaginatedQueryHasResults>  */}
      <ServicesListTable services={services} />
      {/* </PaginatedQueryHasResults>
      <PaginatedQueryHasNoResults> 
      <Text>Brak wyników</Text> 
      </PaginatedQueryHasNoResults> 
      </PaginatedQueryProvider>  */}
    </Stack>
  )
}

export default ViewServices
