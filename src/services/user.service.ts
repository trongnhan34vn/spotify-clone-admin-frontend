import type { CreateAdminReq, User } from '../types/entities/user.type';
import type { Query } from '../types/entities/query.type';
import { http } from '../services';

export const listAdminsService = async (query: Query) => {
  const { sortBy, sortType, size, page, filter } = query;
  let filterStringQuery = '';
  if (filter) {
    filterStringQuery = `&filter=${encodeURIComponent(JSON.stringify(filter))}`;
  }
  const response = await http().get(
    `/api/v1/users/admin/list?page=${page}&size=${size}&sortBy=${sortBy}&sortType=${sortType}${filterStringQuery}`
  );

  return response.data;
};

export const createAdminService = async (req: CreateAdminReq) => {
  const response = await http().post('/api/v1/users/admin/create', req);
  return response.data;
};

export const detailAdminService = async (id: string) => {
  const response = await http().get('/api/v1/users/admin/detail/' + id);
  return response.data;
};

export const deleteAdminService = async (id: string) => {
  const response = await http().delete('/api/v1/users/admin/delete/' + id);
  return response.data;
};

export const updateAdminService = async (data: User) => {
  const response = await http().put('/api/v1/users/admin/update', data);
  return response.data;
};

export const listUserFilterOptionService = async () => {
  const response = await http().get('/api/v1/users/admin/filter-options');
  return response.data;
};
