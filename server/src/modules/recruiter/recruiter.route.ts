import express from "express";
import { validateRequest } from "../../middleware/validateRequest.middleware";
import {
  createRecruiterDetailsSchema,
  updateRecruiterSchema,
} from "./recruiter.validation";
import * as RecruiterController from "./recruiter.controller";
import { allowRole, authGuard } from "../../middleware/auth.middleware";

const router = express.Router();

router.get(
  "/get-all-recruiters",
  authGuard,
  allowRole("admin", "recruiter", "jobSeeker"),
  RecruiterController.getAllRecruiters,
);
router.get(
  "/get-recruiter/:id",
  authGuard,
  allowRole("admin", "recruiter", "jobSeeker"),
  RecruiterController.getSingleRecruiter,
);

router.post(
  "/create-recruiter-details",
  authGuard,
  allowRole("recruiter"),
  validateRequest(createRecruiterDetailsSchema),
  RecruiterController.createRecruiterDetails,
);

router.patch(
  "/update-recruiter-details/:id",
  authGuard,
  allowRole("recruiter"),
  validateRequest(updateRecruiterSchema),
  RecruiterController.updateRecruiter,
);

router.delete(
  "/delete-recruiter/:id",
  authGuard,
  allowRole("admin", "recruiter"),
  RecruiterController.deleteRecruiter,
);

export default router;
