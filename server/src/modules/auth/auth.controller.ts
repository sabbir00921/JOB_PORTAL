import { Request, Response } from "express";
import { asyncHandler } from "../../utils/asyncHandler";
import ApiResponse from "../../utils/apiResponse";
import { authService } from "./auth.service";

export const registerUser = asyncHandler(async (req, res) => {
  const result = await authService.registerUser(req.body);
  ApiResponse.sendSuccess(res, 201, "Registered successfully", result);
});

export const loginUser = asyncHandler(async (req, res) => {
  const {user, accessToken, refreshToken} = await authService.loginUser(req.body);

  //save access token in cookie
  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    maxAge: 1000 * 60 * 60 * 24 * 7,
  });
  //save refresh token in cookie
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    maxAge: 1000 * 60 * 60 * 24 * 7,
  });
  ApiResponse.sendSuccess(res, 200, "User logged in successfully", {
    ...user,
    accessToken,
    refreshToken,
  });
});

export const logoutUser = asyncHandler(async (req, res) => {
  const result = await authService.logoutUser(req);
  //remove access token from cookie
  res.clearCookie("accessToken");
  res.clearCookie("refreshToken");
  ApiResponse.sendSuccess(res, 200, "User logged out successfully", result);
});


export const forgetPassword = asyncHandler(async (req, res) => {
  const result = await authService.forgetPassword(req.body);
  ApiResponse.sendSuccess(res, 200, "Sent OTP successfully", result);
});

export const verifyForgetPasswordOTP = asyncHandler(async (req, res) => {
  const result = await authService.verifyForgetPasswordOTP(req.body);
  ApiResponse.sendSuccess(res, 200, "OTP verified successfully", {
    passwordResetToken: result.passwordResetToken,
  });
});

export const resetPassword = asyncHandler(async (req, res) => {
  const result = await authService.resetPassword(req.body);
  ApiResponse.sendSuccess(res, 200, "Password reset successfully", result);
});

export const generateAccessToken = asyncHandler(async (req, res) => {
  const result = await authService.generateAccessToken(req.body);
  ApiResponse.sendSuccess(
    res,
    200,
    "Access token generated successfully",
    result,
  );
});
