import { prisma } from "../../database/prisma";
import { deleteCloudinary, uploadCloudinary } from "../../helpers/cloudinary";
import CustomError from "../../helpers/CustomError";
import { paginationHelper } from "../../utils/pagination";
import {
  CreateJobSeekerDetailsPayload,
  UpdateJobSeekerPayload,
} from "./jobSeeker.validation";

export const jobSeekerService = {
  async createJobSeekerDetails(
    payload: CreateJobSeekerDetailsPayload,
    resume: any,
  ) {
    //check job seeker details already exist
    const existJobSeekerDetails = await prisma.jobSeeker.findUnique({
      where: { userId: payload.userId },
    });
    if (existJobSeekerDetails)
      throw new CustomError(400, "JobSeeker details already exist");

    //create job seeker details
    const result = await prisma.jobSeeker.create({
      data: payload as any,
    });

    //upload resume to cloudinary
    if (resume) {
      const uploadedResume = await uploadCloudinary(resume.path, "raw");
      //update job seeker details
      const updatedJobSeeker = await prisma.jobSeeker.update({
        where: { id: result.id },
        data: {
          resume: uploadedResume,
        },
      });

      return updatedJobSeeker;
    }

    return result;
  },

  async getAllJobSeekersDetails(query: any) {
    const { page, limit, skip } = paginationHelper(query.page, query.limit);

    const [items, total] = await Promise.all([
      prisma.jobSeeker.findMany({
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
            },
          },
        },
      }),
      prisma.jobSeeker.count(),
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

  async getSingleJobSeekerDetails(id: string) {
    const item = await prisma.jobSeeker.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            firstName: true,
            lastName: true,
            email: true,
            phone: true,
            image: true,
          },
        },
      },
    });
    if (!item) throw new CustomError(404, "JobSeeker not found");
    return item;
  },

  async updateJobSeekerDetails(id: string, payload: UpdateJobSeekerPayload, resume?: any) {
    const item = await prisma.jobSeeker.findUnique({ where: { id } });
    if (!item) throw new CustomError(404, "JobSeeker not found");

    let result = await prisma.jobSeeker.update({
      where: { id },
      data: payload as any,
    });

    if (resume) {
      // delete old resume if exists
      if ((item as any).resume?.public_id) {
        await deleteCloudinary((item as any).resume.public_id, "raw");
      }

      // upload new resume
      const uploadedResume = await uploadCloudinary(resume.path, "raw");
      
      // update db with new resume
      result = await prisma.jobSeeker.update({
        where: { id },
        data: {
          resume: uploadedResume,
        },
      });
    }

    return result;
  },

  async deleteJobSeekerDetails(id: string) {
    const item = await prisma.jobSeeker.findUnique({ where: { id } });
    if (!item) throw new CustomError(404, "JobSeeker not found");

    await prisma.jobSeeker.delete({
      where: { id },
    });


    //delete resume from cloudinary
    if ((item as any).resume?.public_id) {
      const deletedResume = await deleteCloudinary(
        (item as any).resume.public_id as string,
        "raw",
      );
      // console.log(deletedResume, "deletedResume");
    }

    return;
  },
};
