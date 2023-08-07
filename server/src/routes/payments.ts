import { Router } from "express";
import {
  cronReduceBalances,
  getScheduledPayments,
  getCompletedPayments,
  createPayout,
  getPayoutsDetails,
  getAllPayments,
  getDashboard,
} from "../controllers/payments";
import { verifyToken } from "../middleware/verifyToken";
const router = Router();

router.post("/cron-reduce-balances", cronReduceBalances);
router.get("/get-all-payments", verifyToken, getAllPayments);

router.get("/get-dashboard", verifyToken, getDashboard);

router.post("/create-payout/:vendorId", verifyToken, createPayout);
router.get("/get-payouts-details", verifyToken, getPayoutsDetails);

// for testing
router.get("/scheduled-payments", getScheduledPayments);
router.get("/completed-payments", getCompletedPayments);

export default router;
