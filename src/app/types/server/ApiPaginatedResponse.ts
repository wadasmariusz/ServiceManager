import { Pagination } from './Pagination'

export type ApiPaginatedResponse<T> = Pagination & {
  items: T[]
}
