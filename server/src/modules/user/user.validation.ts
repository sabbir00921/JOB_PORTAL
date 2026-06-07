import { z } from "zod";

export const createUserSchema = z.object({
  body: z.object({
    // TODO: Add validation
  }),
});

export const updateUserSchema = z.object({
  body: z.object({
    // TODO: Add validation
  }),
});

export type CreateUserPayload = z.infer<typeof createUserSchema>["body"];
export type UpdateUserPayload = z.infer<typeof updateUserSchema>["body"];
