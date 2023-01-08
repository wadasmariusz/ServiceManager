import { TUserItem } from 'app/api/admin/users/getUsers'
import DataTable from 'components/common/dataTableRepresentation/DataTable'

import UsersListElement from './UsersListElement'

const headers = [
  { id: '1', label: 'Imię i Nazwisko' },
  { id: '2', label: 'Numer Telefonu' },
  { id: '3', label: 'Rola' },
  { id: '4', label: 'Status' },
  { id: '5', label: 'Data założenia' },
  { id: '6', label: '' },
]

type UsersListTableProps = { users: TUserItem[] | undefined }

const UsersListTable = ({ users }: UsersListTableProps) => {
  if (users) {
    return (
      <DataTable headers={headers}>
        {users?.map((user) => (
          <UsersListElement key={user.userId} user={user} />
        ))}
      </DataTable>
    )
  }
  return null
}

export default UsersListTable
