import { routes } from 'app/router'

import UsersListTable from '../../../components/admin-panel/users/UsersListTable'

import { useGetUsers, TUserItem } from 'app/api/admin/users/getUsers'

import { PaginatedQueryProvider } from 'app/context/PaginatedQueryProvider'

import { Breadcrumb } from 'components/common/layout'

import { Text, Stack } from '@mantine/core'
import { PaginatedQueryHasResults } from 'app/context/PaginatedQueryHasResults'
import { PaginatedQueryHasNoResults } from 'app/context/PaginatedQueryHasNoResults'
import { SearchFilters } from 'components/common/filtration/SearchFilters'

const ViewUsers = () => {
  const breadcrumbItems = [
    { label: 'Użytkownicy', url: routes['admin-panel.users'] },
  ]

  const query = useGetUsers()

  return (
    <Stack>
      <Breadcrumb items={breadcrumbItems} />

      <PaginatedQueryProvider<TUserItem> {...query}>
        <SearchFilters />
        {/* <Searchbar></Searchbar> */}
        <PaginatedQueryHasResults>
          <UsersListTable users={query.data} />
        </PaginatedQueryHasResults>
        <PaginatedQueryHasNoResults>
          <Text>Brak wyników</Text>
        </PaginatedQueryHasNoResults>
      </PaginatedQueryProvider>
    </Stack>
  )
}

export default ViewUsers
