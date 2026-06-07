import express from "express";
import { validateRequest } from "../../middleware/validateRequest.middleware";
import { createJobSchema, updateJobSchema } from "./job.validation";
import * as JobController from "./job.controller";
import { authGuard, allowRole } from "../../middleware/auth.middleware";

const router = express.Router();
router.post(
  "/create-job",
  authGuard,
  allowRole("recruiter"),
  validateRequest(createJobSchema),
  JobController.createJob,
);

router.get("/get-all-jobs", JobController.getAllJobs);

router.get(
  "/my-jobs",
  authGuard,
  allowRole("recruiter"),
  JobController.getMyJobs,
);

router.get("/get-job/:id", JobController.getSingleJob);

router.patch(
  "/update-job/:id",
  authGuard,
  allowRole("recruiter"),
  validateRequest(updateJobSchema),
  JobController.updateJob,
);

router.delete(
  "/delete-job/:id",
  authGuard,
  allowRole("recruiter"),
  JobController.deleteJob,
);

export default router;
