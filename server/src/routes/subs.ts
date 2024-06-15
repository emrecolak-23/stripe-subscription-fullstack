import express from "express";
import { SubsController } from "../controllers/subs";
import { currentUser } from "../middleware/current-user";
import { requireAuth } from "../middleware/require-auth";

const router = express.Router();
const subsController = new SubsController();

router.get("/prices", subsController.getAllSubsPrices);
router.post(
  "/create-subscription",
  currentUser,
  requireAuth,
  subsController.createSubscription
);

router.get(
  "/subscription-status",
  currentUser,
  requireAuth,
  subsController.subscriptionStatus
);

router.get(
  "/subscriptions",
  currentUser,
  requireAuth,
  subsController.subscriptions
);

export { router };
