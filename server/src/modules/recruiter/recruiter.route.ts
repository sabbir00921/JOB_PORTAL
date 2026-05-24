import express from "express";
import { validateRequest } from "../../middleware/validateRequest.middleware";
import { createRecruiterDetailsSchema, updateRecruiterSchema } from "./recruiter.validation";
import * as RecruiterController from "./recruiter.controller";

const router = express.Router();

router.get("/", RecruiterController.getAllRecruiters);
router.get("/:id", RecruiterController.getSingleRecruiter);

router.post(
  "/",
  validateRequest(createRecruiterDetailsSchema),
  RecruiterController.createRecruiterDetails
);

router.patch(
  "/:id",
  validateRequest(updateRecruiterSchema),
  RecruiterController.updateRecruiter
);

router.delete("/:id", RecruiterController.deleteRecruiter);

export default router;
