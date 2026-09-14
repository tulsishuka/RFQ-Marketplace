

import { Response } from "express";
import RFQ from "../models/RFQ";
import Quote from "../models/Quote";
import { AuthRequest } from "../middleware/authMiddleware";
import mongoose from "mongoose";

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

export const getSupplierRFQById = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    if (Array.isArray(id) || !mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json({
        message: "Invalid RFQ ID",
      });

      return;
    }

    const rfq = await RFQ.findOne({
      _id: new mongoose.Types.ObjectId(id),
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

    // Validate RFQ ID
    if (Array.isArray(id) || !mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json({
        message: "Invalid RFQ ID",
      });

      return;
    }

    const {
      price,
      deliveryTime,
      message,
    } = req.body;

    // Validate required fields
    if (!price || !deliveryTime) {
      res.status(400).json({
        message: "Price and delivery time are required",
      });

      return;
    }

    // Validate price
    if (Number(price) < 0) {
      res.status(400).json({
        message: "Price cannot be negative",
      });

      return;
    }

    // Find RFQ
    const rfq = await RFQ.findOne({
      _id: new mongoose.Types.ObjectId(id),
      status: "open",
    });

    if (!rfq) {
      res.status(404).json({
        message: "RFQ not found or no longer accepting quotations",
      });

      return;
    }

    if (new Date(rfq.deadline) < new Date()) {
      res.status(400).json({
        message: "Quotation deadline has passed",
      });

      return;
    }

    const existingQuote = await Quote.findOne({
      rfq: new mongoose.Types.ObjectId(id),
      supplier: req.user.id,
    });

    if (existingQuote) {
      res.status(400).json({
        message: "You have already submitted a quotation for this RFQ",
      });

      return;
    }

    const quote = await Quote.create({
      rfq: new mongoose.Types.ObjectId(id),
      supplier: req.user.id,
      price: Number(price),
      deliveryTime,
      message: message || "",
    });

    res.status(201).json({
      message: "Quotation submitted successfully",
      quote,
    });
  } catch (error) {
    console.error("Create quotation error:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
};

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
    console.error("Get my quotations error:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
};
