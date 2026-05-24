import { z } from "zod";

export const createJobSeekerDetailsSchema = z.object({
  body: z.object({
    userId: z.string().min(1, "User ID is required"),
    coverLetter: z.string().optional(),
    skills: z.preprocess((val) => {
      if (typeof val === "string") {
        try {
          const parsed = JSON.parse(val);
          if (Array.isArray(parsed)) return parsed;
        } catch {
          return val.split(",").map((s) => s.trim());
        }
        return [val];
      }
      if (Array.isArray(val)) return val;
      return val;
    }, z.array(z.string()).optional()),
    experience: z.coerce.number().optional(),
    education: z.string().optional(),
    bio: z.string().optional(),
  }),
});

export const updateJobSeekerSchema = z.object({
  body: z.object({
    resume: z.any().optional(),
    coverLetter: z.string().optional(),
    skills: z.preprocess((val) => {
      if (typeof val === "string") {
        try {
          const parsed = JSON.parse(val);
          if (Array.isArray(parsed)) return parsed;
        } catch {
          return val.split(",").map((s) => s.trim());
        }
        return [val];
      }
      if (Array.isArray(val)) return val;
      return val;
    }, z.array(z.string()).optional()),
    experience: z.coerce.number().optional(),
    education: z.string().optional(),
    bio: z.string().optional(),
  }),
});

export type CreateJobSeekerDetailsPayload = z.infer<typeof createJobSeekerDetailsSchema>["body"];
export type UpdateJobSeekerPayload = z.infer<typeof updateJobSeekerSchema>["body"];
