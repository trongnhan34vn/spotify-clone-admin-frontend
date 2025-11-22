export type Pagination<T> = {
  data: T[];
  totalItem: number;
  totalPage: number;
  hasPrevious: boolean;
  hasNext: boolean;
  page: number;
  size: number;
}