import { prisma } from "../../database/prisma";
import CustomError from "../../helpers/CustomError";
import { paginationHelper } from "../../utils/pagination";
import { CreateUserPayload, UpdateUserPayload } from "./user.validation";
import { userRepository  } from "./user.repository";

export const userService = {
  async createUser(payload: CreateUserPayload) {
    const result = await prisma.user.create({
      data: payload as any,
    });
    return result;
  },

  async getAllUsers(query: any) {
    const { page, limit, skip } = paginationHelper(query.page, query.limit);

    const [users, total] = await Promise.all([
      prisma.user.findMany({
        skip,
        take: limit,
      }),
      prisma.user.count(),
    ]);

    //return safe users
    

    return {
      users: users.map(user => userRepository.safeUser(user)),
      meta: {
        page,
        limit,
        totalPages: Math.ceil(total / limit),
        total,
      },
    };
  },

  async getUser(id: string) {
    const item = await prisma.user.findUnique({
      where: { id },
    });
    if (!item) throw new CustomError(404, "User not found");
    return item;
  },

  async updateUser(id: string, payload: UpdateUserPayload) {
    const item = await prisma.user.findUnique({ where: { id } });
    if (!item) throw new CustomError(404, "User not found");

    return prisma.user.update({
      where: { id },
      data: payload as any,
    });
  },

  async deleteUser(id: string) {
    const item = await prisma.user.findUnique({ where: { id } });
    if (!item) throw new CustomError(404, "User not found");

    return prisma.user.delete({
      where: { id },
    });
  },
};
