export type Pagination<T> = {
  content: T[];
  totalItem: number;
  totalPage: number;
  hasPrevious: boolean;
  hasNext: boolean;
  page: number;
  size: number;
}