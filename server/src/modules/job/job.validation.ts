import { z } from "zod";


// model Job {
//   id String @id @default(uuid())
//   recruiterId String
//   recruiter Recruiter @relation(fields: [recruiterId], references: [id], onDelete: Cascade)
//   title String
//   description String
//   responsibilities String[]
//   qualifications String[]
//   salary String?
//   location String?
//   jobType JobType @default(fullTime)
//   experienceLevel ExperienceLevel @default(entryLevel)
//   skills String[]
//   benefits String[]
//   applicationDeadline DateTime?
//   createdAt DateTime @default(now())
//   updatedAt DateTime @updatedAt
//   @@map("jobs")

//   //relations
//   applications Application[]
//   savedJobs SavedJob[]
// }

export const createJobSchema = z.object({
  body: z.object({
    title: z.string(),
    description: z.string(),
    responsibilities: z.array(z.string()),
    qualifications: z.array(z.string()),
    salaryMin: z.number(),
    salaryMax: z.number(),
    currency: z.string().optional(),
    location: z.string().optional(),
    jobType: z.enum(["fullTime", "partTime", "contract", "temporary", "internship"]),
    experienceLevel: z.enum(["entryLevel", "midLevel", "seniorLevel", "leadLevel", "executiveLevel"]),
    skills: z.array(z.string()),
    benefits: z.array(z.string()),
    applicationDeadline: z.string().optional(),
  }),
});

export const updateJobSchema = z.object({
  body: z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    responsibilities: z.array(z.string()).optional(),
    qualifications: z.array(z.string()).optional(),
    salaryMin: z.number().optional(),
    salaryMax: z.number().optional(),
    currency: z.string().optional(),
    location: z.string().optional(),
    jobType: z.enum(["fullTime", "partTime", "contract", "temporary", "internship"]).optional(),
    experienceLevel: z.enum(["entryLevel", "midLevel", "seniorLevel", "leadLevel", "executiveLevel"]).optional(),
    skills: z.array(z.string()).optional(),
    benefits: z.array(z.string()).optional(),
    applicationDeadline: z.string().optional(),
  }),
});

