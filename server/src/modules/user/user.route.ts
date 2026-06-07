import express from "express";
import { validateRequest } from "../../middleware/validateRequest.middleware";
import { createUserSchema, updateUserSchema } from "./user.validation";
import * as UserController from "./user.controller";

const router = express.Router();

router.get("/", UserController.getAllUsers);
router.get("/:id", UserController.getSingleUser);

router.patch(
  "/:id",
  validateRequest(updateUserSchema),
  UserController.updateUser
);

router.delete("/:id", UserController.deleteUser);

export default router;
