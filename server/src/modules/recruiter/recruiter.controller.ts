import { Request, Response } from "express";
import { asyncHandler } from "../../utils/asyncHandler";
import ApiResponse from "../../utils/apiResponse";
import { recruiterService } from "./recruiter.service";
import CustomError from "../../helpers/CustomError";

export const createRecruiterDetails = asyncHandler(async (req, res) => {
  const { id: userId, role } = req.user as { id: string, role: string }
  if(role !== "recruiter"){
    throw new CustomError (403, "Unauthorized access!")
  }
  const result = await recruiterService.createRecruiterDetails(req.body,userId );
  ApiResponse.sendSuccess(res, 201, "Recruiter details added successfully", result);
});

export const getAllRecruiters = asyncHandler(async (req, res) => {
  const { items, meta } = await recruiterService.getAllRecruiters(req.query);
  ApiResponse.sendSuccess(res, 200, "Recruiters fetched successfully", items, meta);
});

export const getSingleRecruiter = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const result = await recruiterService.getRecruiter(id as string);
  ApiResponse.sendSuccess(res, 200, "Recruiter fetched successfully", result);
});

export const updateRecruiter = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const result = await recruiterService.updateRecruiter(id as string, req.body);
  ApiResponse.sendSuccess(res, 200, "Recruiter updated successfully", result);
});

export const deleteRecruiter = asyncHandler(async (req, res) => {
  const { id } = req.params;
  await recruiterService.deleteRecruiter(id as string);
  ApiResponse.sendSuccess(res, 200, "Recruiter deleted successfully");
});
