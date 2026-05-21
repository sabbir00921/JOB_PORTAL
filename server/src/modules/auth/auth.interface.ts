export interface IAuth {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateAuthPayload {
  name: string;
  email: string;
  password: string;
  role: string;
}

export interface UpdateAuthPayload {
  name?: string;
  email?: string;
  password?: string;
  role?: string;
}
