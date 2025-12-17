export type UserSignIn = {
  username: string;
  password: string;
}

export type User = {
  id: string;
  code: string;
  username: string;
  email: string;
  image: string;
  firstName: string;
  lastName: string;
  password: string;
  status: boolean;
  groups: string[];
  createdAt: string;
  credentialsUrl?: string;
}

export type CreateAdminReq = Omit<User, 'id' | 'createdAt' | 'status' | 'credentialsUrl' | 'password' | 'image'>

export type Group = {
  name: string;
  id: string;
}

export type UserFilterOption = {
  firstName: string[];
  lastName: string [];
  groups: string[];
  active: string[];
}