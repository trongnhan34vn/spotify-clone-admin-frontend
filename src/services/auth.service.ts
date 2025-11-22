import { createHttpClient } from '.';
import type { UserSignIn } from '../types/entities/user.type';

export const signInService = async (user: UserSignIn) => {
  try {
    const client = createHttpClient();
    const res = await client.post('/api/v1/auth/sign-in', user);
    return res.data;
  } catch (error) {
    console.log('[Service] Error occurred when signing in', error);
    throw error;
  }
};
