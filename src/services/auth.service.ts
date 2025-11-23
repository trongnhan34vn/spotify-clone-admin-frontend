import { http } from '.';
import type { UserSignIn } from '../types/entities/user.type';

export const signInService = async (user: UserSignIn) => {
  const res = await http().post('/api/v1/auth/sign-in', user);
  return res.data;
};

export const changePasswordService = async (data: any) => {
  return (await http().post('/api/v1/auth/password', data)).data;
};

export const signOutService = async (data: any) => {
  return await http().post('/api/v1/auth/sign-out', data);
} 
