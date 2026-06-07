import { JobType, ExperienceLevel } from "@prisma/client";

export interface IJob {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

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

export interface CreateJobPayload {
  title: string;
  description: string;
  responsibilities: string[];
  qualifications: string[];
  salaryMin: number;
  salaryMax: number;
  currency?: string;
  location: string;
  jobType: JobType;
  experienceLevel: ExperienceLevel;
  skills: string[];
  benefits: string[];
  applicationDeadline: Date;
}

export interface UpdateJobPayload {
  title: string;
  description: string;
  responsibilities: string[];
  qualifications: string[];
  salaryMin?: number;
  salaryMax?: number;
  currency?: string;
  location: string;
  jobType: JobType;
  experienceLevel: ExperienceLevel;
  skills: string[];
  benefits: string[];
  applicationDeadline: Date;
}
