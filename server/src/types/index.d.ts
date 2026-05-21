declare global {
  namespace Express {
    interface User {
      id: string;
      email: string;
      role: string;
      status?: string;
    }

    interface Request {
      user?: User;
    }
  }
}

export {};
