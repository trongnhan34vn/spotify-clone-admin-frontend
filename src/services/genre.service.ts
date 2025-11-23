import { http } from '.';
import type { CreateGenre, Genre } from '../types/entities/genre.type';
import type { Query } from '../types/entities/query.type';

export const listGenreService = async (query: Query) => {
  const { sortBy, sortType, size, page, filter } = query;
  let filterStringQuery = '';
  if (filter) {
    filterStringQuery = `&filter=${encodeURIComponent(JSON.stringify(filter))}`;
  }
  const response = await http().get(
    `/api/v1/business/genres/list?page=${page}&size=${size}&sortBy=${sortBy}&sortType=${sortType}${filterStringQuery}`
  );

  return response.data;
};

export const detailGenreService = async (id: string) => {
  const response = await http().get('/api/v1/business/genres/detail/' + id);
  return response.data;
};

export const createGenreService = async (data: CreateGenre) => {
  const response = await http().post(
    '/api/v1/business/genres/create',
    data
  );
  return response.data;
};

export const deleteGenreService = async (id: string) => {
  const response = await http().delete(
    '/api/v1/business/genres/delete' + id
  );
  return response.data;
};

export const updateGenreService = async (data: Genre) => {
  const response = await http().put('/api/v1/business/genres/update', data);
  return response.data;
};

export const listGenreFilterOptionService = async () => {
  const response = await http().get(
    '/api/v1/business/genres/filter-options'
  );
  return response.data;
};
