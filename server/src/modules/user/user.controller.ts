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
