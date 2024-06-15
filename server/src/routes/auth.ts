import express from "express";

import { AuthController } from "../controllers/auth";
import { validate } from "../middleware/validate";
import { registerValidation, signinValidation } from "../validations/auth";

import { requireAuth } from "../middleware/require-auth";
import { currentUser } from "../middleware/current-user";

const router = express.Router();

const authController = new AuthController();

router.post(
  "/auth/register",
  validate(registerValidation),
  authController.register
);

router.post("/auth/signin", validate(signinValidation), authController.signin);
router.get("/auth/me", currentUser, requireAuth, authController.me);

export { router };
