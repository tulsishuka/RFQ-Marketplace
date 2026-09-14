import { Router } from "express";

import {
  createRFQ,
  getMyRFQs,
  getRFQById,
  getRFQQuotes,
  updateRFQ,
} from "../controllers/rfqController";

import authMiddleware from "../middleware/authMiddleware";
import roleMiddleware from "../middleware/roleMiddleware";
import upload from "../middleware/uploadMiddleware";

const router = Router();

router.post(
  "/",
  authMiddleware,
  roleMiddleware("buyer"),
  upload.array("images", 5),
  createRFQ
);

router.get(
  "/my",
  authMiddleware,
  roleMiddleware("buyer"),
  getMyRFQs
);

router.get(
  "/:id",
  authMiddleware,
  roleMiddleware("buyer"),
  getRFQById
);
router.put(
  "/:id",
  authMiddleware,
  roleMiddleware("buyer"),
  updateRFQ
);

router.get(
  "/:id/quotes",
  authMiddleware,
  roleMiddleware("buyer"),
  getRFQQuotes
);

export default router;