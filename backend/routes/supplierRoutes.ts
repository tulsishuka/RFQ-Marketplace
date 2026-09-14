import { Router } from "express";

import {
  getAllRFQs,
  getSupplierRFQById,
  createQuote,
  getMyQuotes,
} from "../controllers/supplierController";

import authMiddleware from "../middleware/authMiddleware";
import roleMiddleware from "../middleware/roleMiddleware";

const router = Router();

router.get(
  "/rfqs",
  authMiddleware,
  roleMiddleware("supplier"),
  getAllRFQs
);

router.get(
  "/rfqs/:id",
  authMiddleware,
  roleMiddleware("supplier"),
  getSupplierRFQById
);

router.post(
  "/rfqs/:id/quotes",
  authMiddleware,
  roleMiddleware("supplier"),
  createQuote
);

router.get(
  "/quotes/my",
  authMiddleware,
  roleMiddleware("supplier"),
  getMyQuotes
);

export default router;