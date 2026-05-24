import express from "express";
const router = express.Router();

import authRoute from "../modules/auth/auth.route";
import jobSeekerRoute from "../modules/jobSeeker/jobSeeker.route";
import recruiterRoute from "../modules/recruiter/recruiter.route";

router.use("/auth", authRoute);
router.use("/job-seekers", jobSeekerRoute);
router.use("/recruiters", recruiterRoute);

export default router;
