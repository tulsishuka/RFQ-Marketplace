import { Request, Response } from "express";
import bcrypt from "bcryptjs";

import User from "../models/User";
import generateToken from "../utils/generateToken";


export const register = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const {
      name,
      email,
      password,
      role,
    } = req.body;

    if (!name || !email || !password || !role) {
      res.status(400).json({
        message: "All fields are required",
      });

      return;
    }

    if (role !== "buyer" && role !== "supplier") {
      res.status(400).json({
        message: "Role must be buyer or supplier",
      });

      return;
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      res.status(400).json({
        message: "User already exists with this email",
      });

      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
    });

    const token = generateToken({
      id: user._id.toString(),
      role: user.role,
    });

    res.status(201).json({
      message: "Registration successful",

      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },

      token,
    });

  } catch (error) {
    console.error("Registration error:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
};


export const login = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const {
      email,
      password,
      role,
    } = req.body;

    if (!email || !password || !role) {
      res.status(400).json({
        message: "Email, password and role are required",
      });

      return;
    }

    if (role !== "buyer" && role !== "supplier") {
      res.status(400).json({
        message: "Role must be buyer or supplier",
      });

      return;
    }

    const user = await User.findOne({ email });

    if (!user) {
      res.status(401).json({
        message: "Invalid email or password",
      });

      return;
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      user.password
    );

    if (!isPasswordCorrect) {
      res.status(401).json({
        message: "Invalid email or password",
      });

      return;
    }

    if (user.role !== role) {
      res.status(403).json({
        message: `This account is registered as ${user.role}`,
      });

      return;
    }

    const token = generateToken({
      id: user._id.toString(),
      role: user.role,
    });

    res.status(200).json({
      message: "Login successful",

      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },

      token,
    });

  } catch (error) {
    console.error("Login error:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
};