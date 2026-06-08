import { prisma } from "../../database/prisma";
import CustomError from "../../helpers/CustomError";
import { paginationHelper } from "../../utils/pagination";
import { CreateUserPayload, UpdateUserPayload } from "./user.interface";
import { userRepository  } from "./user.repository";
import { mailer } from "../../helpers/nodeMailer";
import { verifyAccountOtpTemplate } from "../../tempaletes/auth.templates";
import { generateOTP } from "../../utils/otpGenerator";

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

  async updateUserStatus(id: string, status: any) {
    const item = await prisma.user.findUnique({ where: { id } });
    if (!item) throw new CustomError(404, "User not found");

    return prisma.user.update({
      where: { id },
      data: { status },
    });
  },

  async requestEmailVerification(id: string) {
    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) throw new CustomError(404, "User not found");
    if (user.isVerified) throw new CustomError(400, "User is already verified");

    const otp = generateOTP();
    const expiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    await prisma.user.update({
      where: { id },
      data: {
        verificationOtp: otp,
        verificationOtpExpiry: expiry,
      },
    });

    await mailer({
      subject: "Verify Your Account - OTP",
      template: verifyAccountOtpTemplate(user.firstName, otp),
      email: user.email,
    });

    return { message: "Verification OTP sent successfully" };
  },

  async verifyAccount(payload: { email: string, otp: string }) {
    const { email, otp } = payload;
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) throw new CustomError(404, "User not found");
    if (user.isVerified) throw new CustomError(400, "User is already verified");

    if (user.verificationOtp !== otp) {
      throw new CustomError(401, "Invalid OTP");
    }
    if (user.verificationOtpExpiry && user.verificationOtpExpiry < new Date()) {
      throw new CustomError(401, "OTP expired");
    }

    await prisma.user.update({
      where: { id: user.id },
      data: { 
        isVerified: true,
        verificationOtp: null,
        verificationOtpExpiry: null,
      },
    });

    return { message: "Account verified successfully" };
  },
};
