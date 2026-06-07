import express from "express";
const router = express.Router();

import authRoute from "../modules/auth/auth.route";
import userRoute from "../modules/user/user.route";
import jobSeekerRoute from "../modules/jobSeeker/jobSeeker.route";
import recruiterRoute from "../modules/recruiter/recruiter.route";
import jobRoute from "../modules/job/job.route";


router.use("/auth", authRoute);
router.use("/users", userRoute);
router.use("/job-seekers", jobSeekerRoute);
router.use("/recruiters", recruiterRoute);
router.use("/jobs", jobRoute);

export default router;
