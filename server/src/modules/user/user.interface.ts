export interface IUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password?: string;
  role: "admin" | "jobSeeker" | "recruiter";
  isVerified: boolean;
  image?: any;
  status: "active" | "inactive" | "suspended" | "banned" | "flagged";
  refreshToken?: string | null;
  forgetPasswordOtp?: string | null;
  forgetPasswordOtpExpiry?: Date | null;
  forgetPasswordToken?: string | null;
  forgetPasswordTokenExpiry?: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateUserPayload {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  role?: "admin" | "jobSeeker" | "recruiter";
}

export interface UpdateUserPayload {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  role?: "admin" | "jobSeeker" | "recruiter";
  isVerified?: boolean;
  image?: any;
}

export interface UpdateUserStatusPayload {
  status: "active" | "inactive" | "suspended" | "banned" | "flagged";
}