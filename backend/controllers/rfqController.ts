import { Response } from "express";
import fs from "fs/promises";

import RFQ from "../models/RFQ";
import Quote from "../models/Quote";

import { AuthRequest } from "../middleware/authMiddleware";
import cloudinary from "../config/cloudinary";


export const createRFQ = async (
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

    const {
      productService,
      description,
      quantity,
      unit,
      deliveryLocation,
      deadline,
    } = req.body;

    if (
      !productService ||
      !description ||
      !quantity ||
      !unit ||
      !deliveryLocation ||
      !deadline
    ) {
      res.status(400).json({
        message: "All RFQ fields are required",
      });
      return;
    }

    const allowedUnits = [
      "Units",
      "Pcs",
      "Bays",
      "Kg",
    ];

    if (!allowedUnits.includes(unit)) {
      res.status(400).json({
        message: "Invalid unit",
      });
      return;
    }



  const images: string[] = [];

if (Array.isArray(req.files)) {
  for (const file of req.files) {
    console.log("Uploading file:", file.path);

    const result = await cloudinary.uploader.upload(
      file.path,
      {
        folder: "rfq-marketplace",
      }
    );

    console.log("Cloudinary URL:", result.secure_url);

    images.push(result.secure_url);

    await fs.unlink(file.path);
  }
}

    const rfq = await RFQ.create({
      buyer: req.user.id,
      productService,
      description,
      quantity: Number(quantity),
      unit,
      deliveryLocation,
      deadline,
      images,
      status: "open",
    });

    res.status(201).json({
      message: "RFQ created successfully",
      rfq,
    });
  } catch (error) {
    console.error("Create RFQ error:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
};

export const getMyRFQs = async (
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

    const rfqs = await RFQ.find({
      buyer: req.user.id,
    }).sort({
      createdAt: -1,
    });

    res.status(200).json({
      message: "RFQs fetched successfully",

      count: rfqs.length,

      rfqs,
    });
  } catch (error) {
    console.error("Get my RFQs error:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
};

export const getRFQById = async (
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

    const rfq = await RFQ.findById(id);

    if (!rfq) {
      res.status(404).json({
        message: "RFQ not found",
      });

      return;
    }

    if (rfq.buyer.toString() !== req.user.id) {
      res.status(403).json({
        message: "You are not allowed to view this RFQ",
      });

      return;
    }

    await rfq.populate("buyer", "name email");

    res.status(200).json({
      message: "RFQ fetched successfully",

      rfq,
    });
  } catch (error) {
    console.error("Get RFQ error:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
};

export const getRFQQuotes = async (
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

    const rfq = await RFQ.findById(id);

    if (!rfq) {
      res.status(404).json({
        message: "RFQ not found",
      });

      return;
    }

    if (rfq.buyer.toString() !== req.user.id) {
      res.status(403).json({
        message:
          "You are not allowed to view these quotations",
      });

      return;
    }

    const quotes = await Quote.find({
      rfq: id,
    })
      .populate("supplier", "name email")
      .sort({
        createdAt: -1,
      });

    res.status(200).json({
      message: "Quotations fetched successfully",

      count: quotes.length,

      quotes,
    });
  } catch (error) {
    console.error("Get RFQ quotes error:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
};



