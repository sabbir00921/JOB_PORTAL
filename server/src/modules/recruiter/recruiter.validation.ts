import { z } from "zod";

export const createRecruiterDetailsSchema = z.object({
  body: z.object({
    companyName: z.string().min(1, "Company Name is required"),
    companyLogo: z.any().optional(),
    companyDescription: z.string().optional(),
    companyLocation: z.string().optional(),
    companyWebsite: z.string().optional(),
    companySize: z.string().optional(),
    companyIndustry: z.string().optional(),
    companyHeadquarters: z.string().optional(),
    companyFoundedYear: z.number().optional(),
    companySocialLinks: z.any().optional(),
  }),
});

export const updateRecruiterSchema = z.object({
  body: z.object({
    companyName: z.string().optional(),
    companyLogo: z.any().optional(),
    companyDescription: z.string().optional(),
    companyLocation: z.string().optional(),
    companyWebsite: z.string().optional(),
    companySize: z.string().optional(),
    companyIndustry: z.string().optional(),
    companyHeadquarters: z.string().optional(),
    companyFoundedYear: z.number().optional(),
    companySocialLinks: z.any().optional(),
  }),
});

export type CreateRecruiterDetailsPayload = z.infer<typeof createRecruiterDetailsSchema>["body"];
export type UpdateRecruiterPayload = z.infer<typeof updateRecruiterSchema>["body"];
