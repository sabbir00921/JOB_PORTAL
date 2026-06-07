import { prisma } from "../../database/prisma";
import { User } from "@prisma/client";

// Add specific helper functions here if needed
export const userRepository = {
  // Example helper
  async findDetail(id: string) {
    return prisma.user.findUnique({ where: { id } });
  },

  //safe user 
  safeUser(user: User) {
    const { password, refreshToken,forgetPasswordOtp,forgetPasswordOtpExpiry,forgetPasswordToken,forgetPasswordTokenExpiry, ...safe } = user;
    return safe;
  },



};
