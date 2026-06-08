import { Request, Response } from "express";
import { asyncHandler } from "../../utils/asyncHandler";
import ApiResponse from "../../utils/apiResponse";
import { userService } from "./user.service";


export const getAllUsers = asyncHandler(async (req, res) => {
  const { users, meta } = await userService.getAllUsers(req.query);
  ApiResponse.sendSuccess(res, 200, "Users fetched successfully", users, meta);
});

export const getSingleUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const result = await userService.getUser(id as string);
  ApiResponse.sendSuccess(res, 200, "User fetched successfully", result);
});

export const updateUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const result = await userService.updateUser(id as string, req.body);
  ApiResponse.sendSuccess(res, 200, "User updated successfully", result);
});

export const deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  await userService.deleteUser(id as string);
  ApiResponse.sendSuccess(res, 200, "User deleted successfully");
});

export const updateUserStatus = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const result = await userService.updateUserStatus(id as string, status);
  ApiResponse.sendSuccess(res, 200, "User status updated successfully", result);
});

export const requestEmailVerification = asyncHandler(async (req, res) => {
  const userId = req.user?.id;
  if (!userId) {
    return ApiResponse.sendError(res, 401, "Unauthorized");
  }
  const result = await userService.requestEmailVerification(userId);
  ApiResponse.sendSuccess(res, 200, "Verification email sent successfully", result);
});

export const verifyAccount = asyncHandler(async (req, res) => {
  const result = await userService.verifyAccount(req.body);
  ApiResponse.sendSuccess(res, 200, "Account verified successfully", result);
});
