import { z } from "zod";

export const createUserSchema = z.object({
  body: z.object({
    firstName: z.string(),
    lastName: z.string(),
    email: z.string().email("Invalid email format"),
    phone: z.string(),
    password: z.string().min(6, "Password must be at least 6 characters long"),
    role: z.enum(["admin", "jobSeeker", "recruiter"]).optional(),
  }),
});

export const updateUserSchema = z.object({
  body: z.object({
    firstName: z.string().optional(),
    lastName: z.string().optional(),
    email: z.string().email("Invalid email format").optional(),
    phone: z.string().optional(),
    role: z.enum(["admin", "jobSeeker", "recruiter"]).optional(),
    isVerified: z.boolean().optional(),
    image: z.any().optional(),
  }),
});

export const updateUserStatusSchema = z.object({
  body: z.object({
    status: z.enum(["active", "inactive", "suspended", "banned", "flagged"], {
      message: "Status must be one of active, inactive, suspended, banned, flagged",
    }),
  }),
});

export const verifyAccountSchema = z.object({
  body: z.object({
    email: z.string().email("Invalid email format"),
    otp: z.string().length(6, "OTP must be exactly 6 digits"),
  }),
});
