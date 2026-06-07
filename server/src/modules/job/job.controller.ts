import { Request, Response } from "express";
import { asyncHandler } from "../../utils/asyncHandler";
import ApiResponse from "../../utils/apiResponse";
import { jobService } from "./job.service";

export const createJob = asyncHandler(async (req, res) => {
  const result = await jobService.createJob(req);
  ApiResponse.sendSuccess(res, 201, "Job created successfully", result);
});

export const getAllJobs = asyncHandler(async (req, res) => {
  const { items, meta } = await jobService.getAllJobs(req.query);
  ApiResponse.sendSuccess(res, 200, "Jobs fetched successfully", items, meta);
});

export const getMyJobs = asyncHandler(async (req, res) => {
  const { items, meta } = await jobService.getMyJobs(req );
  ApiResponse.sendSuccess(res, 200, "My Jobs fetched successfully", items, meta);
});

export const getSingleJob = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const result = await jobService.getJob(id as string);
  ApiResponse.sendSuccess(res, 200, "Job fetched successfully", result);
});

export const updateJob = asyncHandler(async (req, res) => {
  const result = await jobService.updateJob(req);
  ApiResponse.sendSuccess(res, 200, "Job updated successfully", result);
});

export const deleteJob = asyncHandler(async (req, res) => {
  await jobService.deleteJob(req);
  ApiResponse.sendSuccess(res, 200, "Job deleted successfully");
});
