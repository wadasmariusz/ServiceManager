import { TServiceItem } from 'app/api/admin/services/getServices'
import DataTable from 'components/common/dataTableRepresentation/DataTable'
import { random } from 'lodash'

import ServicesListElement from './ServicesListElement'

const headers = [
  { id: '1', label: 'Nazwa' },
  { id: '3', label: 'Czas Trwania' },
  { id: '4', label: 'Cena' },
  { id: '5', label: 'Dietetyk' },
]

type ServicesListTableProps = { services: TServiceItem[] | undefined }

const ServicesListTable = ({ services }: ServicesListTableProps) => {
  if (services) {
    return (
      <DataTable headers={headers}>
        {services?.map((service) => (
          <ServicesListElement key={random(1, 100)} service={service} />
        ))}
      </DataTable>
    )
  }
  return null
}

export default ServicesListTable
