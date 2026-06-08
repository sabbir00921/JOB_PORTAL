import express from "express";
import { validateRequest } from "../../middleware/validateRequest.middleware";
import { createUserSchema, updateUserSchema, updateUserStatusSchema, verifyAccountSchema } from "./user.validation";
import * as UserController from "./user.controller";
import { authGuard, allowRole } from "../../middleware/auth.middleware";

const router = express.Router();

router.get(
  "/get-all-users",
  authGuard,
  allowRole("admin"),
  UserController.getAllUsers,
);
router.get(
  "/get-user/:id",
  authGuard,
  UserController.getSingleUser,
);

router.patch(
  "/update-user/:id",
  authGuard,
  validateRequest(updateUserSchema),
  UserController.updateUser,
);

router.patch(
  "/change-user-status/:id",
  authGuard,
  allowRole("admin"),
  validateRequest(updateUserStatusSchema),
  UserController.updateUserStatus,
);

router.delete(
  "/delete-user/:id",
  authGuard,
  allowRole("admin"),
  UserController.deleteUser,
);

router.post(
  "/request-verification",
  authGuard,
  UserController.requestEmailVerification
);

router.post(
  "/verify-account",
  validateRequest(verifyAccountSchema),
  UserController.verifyAccount
);

export default router;
