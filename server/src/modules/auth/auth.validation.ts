import { z } from "zod";

export const registerUserSchema = z
  .object({
    body: z.object({
      firstName: z.string().min(1, "First name is required"),
      lastName: z.string().min(1, "Last name is required"),
      email: z.string().min(1, "Email is required").email("Invalid email format"),
      phone: z
        .string()
        .min(1, "Phone number is required")
        .max(15, "Phone number cannot be more than 15 characters")
        .min(11, "Phone number must be at least 11 characters")
        .regex(/^\+?[0-9]+$/, "Phone number must contain only numbers"),
      password: z
        .string()
        .min(1, "Password is required")
        .min(8, "Password must be at least 8 characters long")
        .max(20, "Password cannot be more than 20 characters long")
        .regex(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.])[A-Za-z\d@$!%*?&.]{8,}$/,
          "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character (including dot)",
        ),
      role: z.enum(["jobSeeker", "recruiter"]),
    }),
    query: z.object({}).optional(),
    params: z.object({}).optional(),
  })
  .strict();

export const loginUserSchema = z
  .object({
    body: z.object({
      email: z.string().min(1, "Email is required").email("Invalid email format"),
      password: z.string().min(1, "Password is required"),
    }),
    query: z.object({}).optional(),
    params: z.object({}).optional(),
  })
  .strict();

export const forgetPasswordSchema = z
  .object({
    body: z.object({
      email: z.string().min(1, "Email is required").email("Invalid email format"),
    }),
    query: z.object({}).optional(),
    params: z.object({}).optional(),
  })
  .strict();

export const verifyForgetPasswordOTPSchema = z
  .object({
    body: z.object({
      email: z.string().min(1, "Email is required").email("Invalid email format"),
      otp: z.string().min(1, "OTP is required"),
    }),
    query: z.object({}).optional(),
    params: z.object({}).optional(),
  })
  .strict();

export const resetPasswordSchema = z
  .object({
    body: z.object({
      password: z
        .string()
        .min(1, "Password is required")
        .min(8, "Password must be at least 8 characters long")
        .max(20, "Password cannot be more than 20 characters long")
        .regex(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.])[A-Za-z\d@$!%*?&.]{8,}$/,
          "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character (including dot)",
        ),
      passwordResetToken: z.string().min(1, "Password reset token is required"),
    }),
    query: z.object({}).optional(),
    params: z.object({}).optional(),
  })
  .strict();

export const generateAccessTokenSchema = z
  .object({
    body: z.object({
      email: z.string().email(),
      password: z.string(),
    }),
    query: z.object({}).optional(),
    params: z.object({}).optional(),
  })
  .strict();

export type CreateAuthPayload = z.infer<typeof registerUserSchema>["body"];
export type LoginUserPayload = z.infer<typeof loginUserSchema>["body"];
