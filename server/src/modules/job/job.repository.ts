import { prisma } from "../../database/prisma";
import { Job } from "@prisma/client";

// Add specific helper functions here if needed
export const jobRepository = {
  // Example helper
  async findDetail(id: string) {
    return prisma.job.findUnique({ where: { id } });
  }
};
