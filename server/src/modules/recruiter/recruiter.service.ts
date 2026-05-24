import { prisma } from "../../database/prisma";
import CustomError from "../../helpers/CustomError";
import { paginationHelper } from "../../utils/pagination";
import { CreateRecruiterDetailsPayload, UpdateRecruiterPayload } from "./recruiter.validation";

export const recruiterService = {
  async createRecruiterDetails(payload: CreateRecruiterDetailsPayload) {
    const result = await prisma.recruiter.create({
      data: payload as any,
    });
    return result;
  },

  async getAllRecruiters(query: any) {
    const { page, limit, skip } = paginationHelper(query.page, query.limit);

    const [items, total] = await Promise.all([
      prisma.recruiter.findMany({
        skip,
        take: limit,
        include: {
          user: {
            select: {
              firstName: true,
              lastName: true,
              email: true,
              phone: true,
              image: true,
            }
          }
        }
      }),
      prisma.recruiter.count(),
    ]);

    return {
      items,
      meta: {
        page,
        limit,
        totalPages: Math.ceil(total / limit),
        total,
      },
    };
  },

  async getRecruiter(id: string) {
    const item = await prisma.recruiter.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            firstName: true,
            lastName: true,
            email: true,
            phone: true,
            image: true,
          }
        }
      }
    });
    if (!item) throw new CustomError(404, "Recruiter not found");
    return item;
  },

  async updateRecruiter(id: string, payload: UpdateRecruiterPayload) {
    const item = await prisma.recruiter.findUnique({ where: { id } });
    if (!item) throw new CustomError(404, "Recruiter not found");

    return prisma.recruiter.update({
      where: { id },
      data: payload as any,
    });
  },

  async deleteRecruiter(id: string) {
    const item = await prisma.recruiter.findUnique({ where: { id } });
    if (!item) throw new CustomError(404, "Recruiter not found");

    return prisma.recruiter.delete({
      where: { id },
    });
  },
};
