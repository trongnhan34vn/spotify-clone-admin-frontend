export type Token = {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  refreshExpiresIn: number;
  username: string;
  hasResetPassword: boolean;
  tokenType: string;
  email: string
}