import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { prisma } from "../../database/prisma";
import { User } from "@prisma/client";
import config from "../../config";
import CustomError from "../../helpers/CustomError";

// Add specific helper functions here if needed
export const authRepository = {
  // Password Helpers
  async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(config.bcryptSaltRounds);
    return bcrypt.hash(password, salt);
  },

  async comparePassword(plain: string, hashed: string): Promise<boolean> {
    return bcrypt.compare(plain, hashed);
  },

  // JWT Token Helpers
  createAccessToken(user: Pick<User, "id" | "email" | "role">): string {
    return jwt.sign(
      { userId: user.id, email: user.email, role: user.role },
      config.jwt.accessTokenSecret as string,
      { expiresIn: config.jwt.accessTokenExpires as any }
    );
  },

  createRefreshToken(user: Pick<User, "id" | "email" | "role">): string {
    return jwt.sign(
      { userId: user.id, email: user.email, role: user.role },
      config.jwt.refreshTokenSecret as string,
      { expiresIn: config.jwt.refreshTokenExpires as any }
    );
  },

  //create password reset token
  createPasswordResetToken(user: Pick<User, "id" | "email" | "role">): string {
    return jwt.sign(
      { userId: user.id, email: user.email, role: user.role },
      config.jwt.accessTokenSecret as string,
      { expiresIn: config.jwt.accessTokenExpires as any }
    );
  },

  //decode password reset token
  decodePasswordResetToken(passwordResetToken: string): any {
    return jwt.verify(passwordResetToken, config.jwt.accessTokenSecret as string);
  },


  // Safe User
  safeUser(user: User) {
    const { password, refreshToken,forgetPasswordOtp,forgetPasswordToken,forgetPasswordTokenExpiry, ...safe } = user;
    return safe;
  },

  async findDetail(id: string) {
    return prisma.user.findUnique({ where: { id } });
  }
};
