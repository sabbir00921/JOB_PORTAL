import { prisma } from "../../database/prisma";
import CustomError from "../../helpers/CustomError";
import { paginationHelper } from "../../utils/pagination";
import { CreateRecruiterDetailsPayload, UpdateRecruiterPayload } from "./recruiter.validation";

export const recruiterService = {
  async createRecruiterDetails(payload: CreateRecruiterDetailsPayload,userId:string) {

const recruiterExists= await prisma.recruiter.findUnique({
  where:{userId}
})

if(recruiterExists){
  throw new CustomError(400,"Recruiter details already exist")
}
    
    const result = await prisma.recruiter.create({
      data: {
        ...payload,
        userId
      }
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
