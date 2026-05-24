import express from "express";
import { validateRequest } from "../../middleware/validateRequest.middleware";
import { createJobSeekerDetailsSchema,  updateJobSeekerSchema} from "./jobSeeker.validation";
import * as JobSeekerController from "./jobSeeker.controller";
import { resumeUpload } from "../../middleware/multer.midleware";

const router = express.Router();


router.post(
  "/add-seeker-info",resumeUpload('resume'),
  validateRequest(createJobSeekerDetailsSchema),
  JobSeekerController.createJobSeekerDetails
);


router.get("/get-all-seekers", JobSeekerController.getAllJobSeekersDetails);
router.get("/get-seeker/:id", JobSeekerController.getSingleJobSeekerDetails);

router.patch(
  "/update-seeker-info/:id",resumeUpload('resume'),
  validateRequest(updateJobSeekerSchema),
  JobSeekerController.updateJobSeekerDetails
);

router.delete("/delete-seeker/:id", JobSeekerController.deleteJobSeekerDetails);

export default router;
