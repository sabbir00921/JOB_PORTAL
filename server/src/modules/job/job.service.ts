import { Request } from "express";
import { prisma } from "../../database/prisma";
import CustomError from "../../helpers/CustomError";
import { paginationHelper } from "../../utils/pagination";
import { CreateJobPayload, UpdateJobPayload } from "./job.interface";

export const jobService = {
  async createJob(req: Request) {
    const data: CreateJobPayload = req.body;
    const { id: userId } = req.user as { id: string };

    console.log("userId", userId);
    console.log("data", data);

    const recruiter = await prisma.recruiter.findUnique({
      where: { userId },
    });

    if (!recruiter) {
      throw new CustomError(404, "Recruiter profile not found");
    }

    const result = await prisma.job.create({
      data: { ...data, recruiterId: recruiter.userId },
    });
    return result;
  },

  async getAllJobs(query: any) {
    const {
      search,
      jobType,
      experienceLevel,
      skills,
      location,
      startDate,
      endDate,
      salaryMin,
      salaryMax,
      sortBy,
      sortOrder,
      page: pageParam,
      limit: limitParam,
    } = query;
    const { page, limit, skip } = paginationHelper(pageParam, limitParam);

    // Validate parameters
    const validJobTypes = [
      "fullTime",
      "partTime",
      "contract",
      "temporary",
      "internship",
    ];
    if (jobType && !validJobTypes.includes(jobType as string)) {
      throw new CustomError(
        400,
        `Invalid jobType. Expected one of: ${validJobTypes.join(", ")}`,
      );
    }

    const validExperienceLevels = [
      "entryLevel",
      "midLevel",
      "seniorLevel",
      "leadLevel",
      "executiveLevel",
    ];
    if (
      experienceLevel &&
      !validExperienceLevels.includes(experienceLevel as string)
    ) {
      throw new CustomError(
        400,
        `Invalid experienceLevel. Expected one of: ${validExperienceLevels.join(", ")}`,
      );
    }

    if (sortOrder && !["asc", "desc"].includes(sortOrder as string)) {
      throw new CustomError(400, "Invalid sortOrder. Expected: asc or desc");
    }

    const validSortFields = [
      "title",
      "salary",
      "salaryMin",
      "salaryMax",
      "applicationDeadline",
      "createdAt",
      "updatedAt",
    ];
    if (sortBy && !validSortFields.includes(sortBy as string)) {
      throw new CustomError(
        400,
        `Invalid sortBy. Expected one of: ${validSortFields.join(", ")}`,
      );
    }

    //search and filter functionality
    const where: any = {};
    if (search) {
      where.OR = [
        { title: { contains: search as string, mode: "insensitive" } },
        { description: { contains: search as string, mode: "insensitive" } },
      ];
    }

    //filter
    if (jobType) {
      where.jobType = jobType;
    }
    if (experienceLevel) {
      where.experienceLevel = experienceLevel;
    }
    if (skills) {
      where.skills = {
        hasSome: typeof skills === "string" ? skills.split(",") : skills,
      };
    }
    if (location) {
      where.location = { contains: location as string, mode: "insensitive" };
    }
    if (salaryMin) {
      where.salaryMin = { gte: Number(salaryMin) };
    }
    if (salaryMax) {
      where.salaryMax = { lte: Number(salaryMax) };
    }

    //date range filter
    if (startDate) {
      where.createdAt = {
        ...where.createdAt,
        gte: new Date(startDate as string),
      };
    }
    if (endDate) {
      where.createdAt = {
        ...where.createdAt,
        lte: new Date(endDate as string),
      };
    }

    //sorting functionality
    const sort: any = {};
    if (sortBy && sortOrder) {
      if (sortBy === "salary") {
        sort["salaryMin"] = sortOrder;
      } else {
        sort[sortBy as string] = sortOrder;
      }
    } else {
      sort["createdAt"] = "desc";
    }

    const [items, total] = await Promise.all([
      prisma.job.findMany({
        where,
        orderBy: sort,
        skip,
        take: limit,
      }),
      prisma.job.count({
        where,
      }),
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

  async getMyJobs(req: Request) {
    const { id: userId, role } = req.user as { id: string; role: string };

    if (role !== "recruiter") {
      throw new CustomError(403, "Only Recruiter can perform this action");
    }

    const query = req.query as any;
    const { page, limit, skip } = paginationHelper(query.page, query.limit);

    const [items, total] = await Promise.all([
      prisma.job.findMany({
        where: { recruiterId: userId },
        include: {
          applications: true,
        },
        skip,
        take: limit,
      }),
      prisma.job.count({
        where: { recruiterId: userId },
      }),
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

  async getJob(id: string) {
    const item = await prisma.job.findUnique({
      where: { id },
    });
    if (!item) throw new CustomError(404, "Job not found");
    return item;
  },

  async updateJob(req: Request) {
    const id = req.params.id as string;
    const payload = req.body as UpdateJobPayload;

    const { id: userId, role } = req.user as { id: string; role: string };

    if (role !== "recruiter") {
      throw new CustomError(403, "Only Recruiter can perform this action");
    }

    const item = await prisma.job.findUnique({
      where: { id, recruiterId: userId },
    });
    if (!item)
      throw new CustomError(
        404,
        "Job not found or You are not authorized to perform this action",
      );

    return prisma.job.update({
      where: { id, recruiterId: userId },
      data: payload as any,
    });
  },

  async deleteJob(req: Request) {
    const id = req.params.id as string;
    const { id: userId, role } = req.user as { id: string; role: string };

    if (role !== "recruiter") {
      throw new CustomError(403, "Only Recruiter can perform this action");
    }
    const item = await prisma.job.findUnique({
      where: { id, recruiterId: userId },
    });
    if (!item)
      throw new CustomError(
        404,
        "Job not found or You are not authorized to delete this job",
      );

    return prisma.job.delete({
      where: { id, recruiterId: userId },
    });
  },
};
