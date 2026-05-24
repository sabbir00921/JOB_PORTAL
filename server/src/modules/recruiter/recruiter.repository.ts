import { prisma } from "../../database/prisma";
import { Recruiter } from "@prisma/client";

// Add specific helper functions here if needed
export const recruiterRepository = {
  // Example helper
  async findDetail(id: string) {
    return prisma.recruiter.findUnique({ where: { id } });
  }
};
