import express from "express";
import { validateRequest } from "../../middleware/validateRequest.middleware";
import { createRecruiterDetailsSchema, updateRecruiterSchema } from "./recruiter.validation";
import * as RecruiterController from "./recruiter.controller";
import { allowRole, authGuard } from "../../middleware/auth.middleware";

const router = express.Router();

router.get("/recruiter-details", RecruiterController.getAllRecruiters);
router.get("/recruiter-details/:id", RecruiterController.getSingleRecruiter);

router.post(
  "/create-recruiter-details",authGuard, allowRole("recruiter"),
  validateRequest(createRecruiterDetailsSchema),
  RecruiterController.createRecruiterDetails
);

router.patch(
  "/recruiter-details/:id",
  validateRequest(updateRecruiterSchema),
  RecruiterController.updateRecruiter
);

router.delete("/recruiter-details/:id", RecruiterController.deleteRecruiter);

export default router;
