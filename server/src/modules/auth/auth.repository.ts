import bcrypt from "bcryptjs";
import jwt, { SignOptions } from "jsonwebtoken";
import { prisma } from "../../database/prisma";
import { User } from "@prisma/client";
import config from "../../config";

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

  //generate access token
  createAccessToken(user: Pick<User, "id" | "email" | "role">): string {
    return jwt.sign(
      { userId: user.id, email: user.email, role: user.role },
      config.jwt.accessTokenSecret as string,
      { expiresIn: config.jwt.accessTokenExpires as SignOptions["expiresIn"] }
    );
  },

  //generate refresh token
  createRefreshToken(user: Pick<User, "id" | "email" | "role">): string {
    return jwt.sign(
      { userId: user.id, email: user.email, role: user.role },
      config.jwt.refreshTokenSecret as string,
      { expiresIn: config.jwt.refreshTokenExpires as SignOptions["expiresIn"] }
    );
  },

  //generate password reset token
  createPasswordResetToken(user: Pick<User, "id" | "email" | "role">): string {
    return jwt.sign(
      { userId: user.id, email: user.email, role: user.role },
      config.jwt.accessTokenSecret as string,
      { expiresIn: config.jwt.accessTokenExpires as SignOptions["expiresIn"] }
    );
  },

  //decode password reset token
  decodePasswordResetToken(passwordResetToken: string): any {
    return jwt.verify(passwordResetToken, config.jwt.accessTokenSecret as string);
  },


  // Safe User
  safeUser(user: User) {
    const { password, refreshToken,forgetPasswordOtp,forgetPasswordOtpExpiry,forgetPasswordToken,forgetPasswordTokenExpiry, ...safe } = user;
    return safe;
  },

  async findDetail(id: string) {
    return prisma.user.findUnique({ where: { id } });
  }
};
