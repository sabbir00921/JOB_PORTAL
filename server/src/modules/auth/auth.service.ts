import { Request } from "express";
import { prisma } from "../../database/prisma";
import CustomError from "../../helpers/CustomError";
import { authRepository } from "./auth.repository";
import { CreateAuthPayload, LoginUserPayload } from "./auth.validation";
import { generateOTP } from "../../utils/otpGenerator";
import { mailer } from "../../helpers/nodeMailer";
import { sentOtpTemplate } from "../../tempaletes/auth.templates";
import config from "../../config";

export const authService = {
  async registerUser(payload: CreateAuthPayload) {
    const { email, password, firstName, lastName, phone, role } = payload;

    const userWithEmail = await prisma.user.findUnique({
      where: { email },
    });
    if (userWithEmail) {
      throw new CustomError(400, "User with this email already exists");
    }

    const userWithPhone = await prisma.user.findUnique({
      where: { phone },
    });
    if (userWithPhone) {
      throw new CustomError(400, "User with this phone number already exists");
    }

    const hashedPassword = await authRepository.hashPassword(password);

    //check email is admin email
    const finalRole = config.adminEmails.includes(email) ? "admin" : role;

    const result = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        firstName,
        lastName,
        phone,
        role: finalRole,
      },
    });

    return authRepository.safeUser(result);
  },

  async loginUser(payload: LoginUserPayload) {
    const { email, password } = payload;

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new CustomError(401, "Invalid email or password");
    }

    //check account status
    if (
      user.status == "suspended" ||
      user.status == "banned" ||
      user.status == "flagged"
    ) {
      throw new CustomError(
        401,
        `Your account is ${user.status}. Please contact the support team.`,
      );
    }

    const isPasswordValid = await authRepository.comparePassword(
      password,
      user.password,
    );
    if (!isPasswordValid) {
      throw new CustomError(401, "Invalid email or password");
    }

    const accessToken = authRepository.createAccessToken(user);
    const refreshToken = authRepository.createRefreshToken(user);

    await prisma.user.update({
      where: { id: user.id },
      data: { refreshToken },
    });

    return {
      user: authRepository.safeUser(user),
      accessToken,
      refreshToken,
    };
  },

  async logoutUser(req: Request) {
    if (!req.user) {
      throw new CustomError(401, "Unauthorized");
    }
    const { id } = req.user;

    const user = await prisma.user.findUnique({
      where: { id },
    });
    if (!user) {
      throw new CustomError(401, "User not found");
    }

    await prisma.user.update({
      where: { id },
      data: { refreshToken: null },
    });
    return { message: "Logged out successfully" };
  },

  async forgetPassword(payload: any) {
    const { email } = payload;
    const user = await prisma.user.findUnique({
      where: { email },
    });
    if (!user) {
      throw new CustomError(401, "User not found");
    }

    //check account status
    if (
      user.status == "suspended" ||
      user.status == "banned" ||
      user.status == "flagged"
    ) {
      throw new CustomError(
        401,
        `Your account is ${user.status}. Please contact the support team.`,
      );
    }

    const otp = generateOTP();
    await prisma.user.update({
      where: { id: user.id },
      data: {
        forgetPasswordOtp: otp,
        forgetPasswordOtpExpiry: new Date(Date.now() + 10 * 60 * 1000),
      },
    });

    await mailer({
      subject: "Forget Password OTP",
      template: sentOtpTemplate(user.firstName, otp),
      email: user.email,
    });
    return { message: "OTP sent successfully" };
  },

  async verifyForgetPasswordOTP(payload: any) {
    const { email, otp } = payload;
    const user = await prisma.user.findUnique({
      where: { email },
    });
    if (!user) {
      throw new CustomError(401, "User not found");
    }
    if (user.forgetPasswordOtp !== otp) {
      throw new CustomError(401, "Invalid OTP");
    }

    if (
      user.forgetPasswordOtpExpiry &&
      user.forgetPasswordOtpExpiry < new Date()
    ) {
      throw new CustomError(401, "OTP expired");
    }
    //now return password reset token
    const passwordResetToken = authRepository.createPasswordResetToken(user);
    await prisma.user.update({
      where: { id: user.id },
      data: {
        forgetPasswordToken: passwordResetToken,
        forgetPasswordTokenExpiry: new Date(Date.now() + 10 * 60 * 1000),
        forgetPasswordOtp: null,
        forgetPasswordOtpExpiry: null,
      },
    });
    return { message: "OTP verified successfully", passwordResetToken };
  },

  async resetPassword(payload: any) {
    const { passwordResetToken, password } = payload;
    //decode password reset token
    const decodedToken =
      authRepository.decodePasswordResetToken(passwordResetToken);
    const { email } = decodedToken;
    const user = await prisma.user.findUnique({
      where: { email },
    });
    if (!user) {
      throw new CustomError(401, "User not found");
    }
    if (user.forgetPasswordToken !== passwordResetToken) {
      throw new CustomError(401, "Invalid password reset token");
    }
    if (
      user.forgetPasswordTokenExpiry &&
      user.forgetPasswordTokenExpiry < new Date()
    ) {
      throw new CustomError(401, "Password reset time expired");
    }
    const hashedPassword = await authRepository.hashPassword(password);
    await prisma.user.update({
      where: { id: user.id },
      data: {
        password: hashedPassword,
        forgetPasswordToken: null,
        forgetPasswordTokenExpiry: null,
      },
    });
    return { message: "Password reset successfully" };
  },

  async generateAccessToken(refreshToken: string) {
    if (!refreshToken) throw new CustomError(401, "Refresh token required");
    // TODO: Verify refresh token and generate new access token
    throw new CustomError(501, "Not implemented");
  },
};
