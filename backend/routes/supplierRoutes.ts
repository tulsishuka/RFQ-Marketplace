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

// Browse all RFQs
router.get(
  "/rfqs",
  authMiddleware,
  roleMiddleware("supplier"),
  getAllRFQs
);

// View one RFQ
router.get(
  "/rfqs/:id",
  authMiddleware,
  roleMiddleware("supplier"),
  getSupplierRFQById
);

// Submit quotation
router.post(
  "/rfqs/:id/quotes",
  authMiddleware,
  roleMiddleware("supplier"),
  createQuote
);

// Supplier's quotations
router.get(
  "/quotes/my",
  authMiddleware,
  roleMiddleware("supplier"),
  getMyQuotes
);

export default router;