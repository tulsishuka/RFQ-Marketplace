import { Response } from "express";
import RFQ from "../models/RFQ";
import Quote from "../models/Quote";
import { AuthRequest } from "../middleware/authMiddleware";

// ==========================================
// GET ALL OPEN RFQs
// ==========================================

export const getAllRFQs = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const rfqs = await RFQ.find({
      status: "open",
      deadline: { $gte: new Date() },
    })
      .populate("buyer", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      count: rfqs.length,
      rfqs,
    });
  } catch (error) {
    console.error("Get all RFQs error:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
};

// ==========================================
// GET SINGLE RFQ
// ==========================================

export const getSupplierRFQById = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    const rfq = await RFQ.findOne({
      _id: id,
      status: "open",
    }).populate("buyer", "name email");

    if (!rfq) {
      res.status(404).json({
        message: "RFQ not found or no longer available",
      });

      return;
    }

    res.status(200).json({
      rfq,
    });
  } catch (error) {
    console.error("Get supplier RFQ error:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
};

// ==========================================
// SUBMIT QUOTATION
// ==========================================

export const createQuote = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({
        message: "Authentication required",
      });

      return;
    }

    const { id } = req.params;

    const {
      price,
      deliveryTime,
      message,
    } = req.body;

    // -------------------------------
    // Validation
    // -------------------------------

    if (!price || !deliveryTime) {
      res.status(400).json({
        message:
          "Price and delivery time are required",
      });

      return;
    }

    if (Number(price) < 0) {
      res.status(400).json({
        message: "Price cannot be negative",
      });

      return;
    }

    // -------------------------------
    // Check RFQ
    // -------------------------------

    const rfq = await RFQ.findOne({
      _id: id,
      status: "open",
    });

    if (!rfq) {
      res.status(404).json({
        message:
          "RFQ not found or no longer accepting quotations",
      });

      return;
    }

    // -------------------------------
    // Check deadline
    // -------------------------------

    if (
      new Date(rfq.deadline) < new Date()
    ) {
      res.status(400).json({
        message: "Quotation deadline has passed",
      });

      return;
    }

    // -------------------------------
    // Prevent duplicate quote
    // -------------------------------

    const existingQuote =
      await Quote.findOne({
        rfq: id,
        supplier: req.user.id,
      });

    if (existingQuote) {
      res.status(400).json({
        message:
          "You have already submitted a quotation for this RFQ",
      });

      return;
    }

    // -------------------------------
    // Create quote
    // -------------------------------

    const quote = await Quote.create({
      rfq: id,
      supplier: req.user.id,
      price: Number(price),
      deliveryTime,
      message: message || "",
    });

    res.status(201).json({
      message:
        "Quotation submitted successfully",
      quote,
    });
  } catch (error) {
    console.error(
      "Create quotation error:",
      error
    );

    res.status(500).json({
      message: "Server error",
    });
  }
};

// ==========================================
// GET MY QUOTATIONS
// ==========================================

export const getMyQuotes = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({
        message: "Authentication required",
      });

      return;
    }

    const quotes = await Quote.find({
      supplier: req.user.id,
    })
      .populate(
        "rfq",
        "productService quantity unit deliveryLocation deadline status"
      )
      .sort({ createdAt: -1 });

    res.status(200).json({
      count: quotes.length,
      quotes,
    });
  } catch (error) {
    console.error(
      "Get my quotations error:",
      error
    );

    res.status(500).json({
      message: "Server error",
    });
  }
};