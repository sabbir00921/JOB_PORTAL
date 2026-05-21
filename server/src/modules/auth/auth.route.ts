import express from "express";
import { validateRequest } from "../../middleware/validateRequest.middleware";
import * as AuthController from "./auth.controller";
import { forgetPasswordSchema, loginUserSchema, registerUserSchema, resetPasswordSchema, verifyForgetPasswordOTPSchema } from "./auth.validation";
import { authGuard } from "../../middleware/auth.middleware";

const router = express.Router();

router.post(
  "/register",
  validateRequest(registerUserSchema),
  AuthController.registerUser,
);
router.post(
  "/login",
  validateRequest(loginUserSchema),
  AuthController.loginUser,
);

router.post("/logout", authGuard, AuthController.logoutUser);
router.post("/forget-password", validateRequest(forgetPasswordSchema), AuthController.forgetPassword);
router.post(
  "/verify-forget-password-otp",
  validateRequest(verifyForgetPasswordOTPSchema),
  AuthController.verifyForgetPasswordOTP,
);
router.post("/reset-password", validateRequest(resetPasswordSchema), AuthController.resetPassword);
router.post("/generate-access-token", AuthController.generateAccessToken);

export default router;
