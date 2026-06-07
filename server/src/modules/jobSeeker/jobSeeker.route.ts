import express from "express";
import { validateRequest } from "../../middleware/validateRequest.middleware";
import {
  createJobSeekerDetailsSchema,
  updateJobSeekerSchema,
} from "./jobSeeker.validation";
import * as JobSeekerController from "./jobSeeker.controller";
import { resumeUpload } from "../../middleware/multer.midleware";
import { authGuard, allowRole } from "../../middleware/auth.middleware";

const router = express.Router();

router.post(
  "/add-seeker-info",
  authGuard,
  allowRole("jobSeeker"),
  resumeUpload("resume"),
  validateRequest(createJobSeekerDetailsSchema),
  JobSeekerController.createJobSeekerDetails,
);

router.get(
  "/get-all-seekers",
  authGuard,
  allowRole("admin", "recruiter"),
  JobSeekerController.getAllJobSeekersDetails,
);
router.get(
  "/get-seeker/:id",
  authGuard,
  allowRole("admin", "recruiter", "jobSeeker"),
  JobSeekerController.getSingleJobSeekerDetails,
);

router.patch(
  "/update-seeker-info/:id",
  authGuard,
  allowRole("jobSeeker"),
  resumeUpload("resume"),
  validateRequest(updateJobSeekerSchema),
  JobSeekerController.updateJobSeekerDetails,
);

router.delete(
  "/delete-seeker/:id",
  authGuard,
  allowRole("admin", "jobSeeker"),
  JobSeekerController.deleteJobSeekerDetails,
);

export default router;
