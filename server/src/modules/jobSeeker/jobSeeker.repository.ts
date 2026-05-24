import { prisma } from "../../database/prisma";
import { JobSeeker } from "@prisma/client";

// Add specific helper functions here if needed
export const jobSeekerRepository = {
  // Example helper
  async findDetail(id: string) {
    return prisma.jobSeeker.findUnique({ where: { id } });
  }
};
