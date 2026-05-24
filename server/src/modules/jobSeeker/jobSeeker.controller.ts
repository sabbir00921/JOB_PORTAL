import { Request, Response } from "express";
import { asyncHandler } from "../../utils/asyncHandler";
import ApiResponse from "../../utils/apiResponse";
import { jobSeekerService } from "./jobSeeker.service";

export const createJobSeekerDetails = asyncHandler(async (req, res) => {
  const resume = req.file;

  const result = await jobSeekerService.createJobSeekerDetails(req.body, resume);
  ApiResponse.sendSuccess(
    res,
    201,
    "JobSeeker details added successfully",
    result,
  );
});

export const getAllJobSeekersDetails = asyncHandler(async (req, res) => {
  const { items, meta } = await jobSeekerService.getAllJobSeekersDetails(
    req.query,
  );
  ApiResponse.sendSuccess(
    res,
    200,
    "JobSeekers fetched successfully",
    items,
    meta,
  );
});

export const getSingleJobSeekerDetails = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const result = await jobSeekerService.getSingleJobSeekerDetails(id as string);
  ApiResponse.sendSuccess(res, 200, "JobSeeker fetched successfully", result);
});

export const updateJobSeekerDetails = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const resume = req.file;
  
  const result = await jobSeekerService.updateJobSeekerDetails(id as string, req.body, resume);
  ApiResponse.sendSuccess(res, 200, "JobSeeker updated successfully", result);
});

export const deleteJobSeekerDetails = asyncHandler(async (req, res) => {
  const { id } = req.params;
  await jobSeekerService.deleteJobSeekerDetails(id as string);
  ApiResponse.sendSuccess(res, 200, "JobSeeker deleted successfully");
});
