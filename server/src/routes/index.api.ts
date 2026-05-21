import express from "express";
const router = express.Router();

import authRoute from "../modules/auth/auth.route";

router.use("/auth", authRoute);

export default router;
