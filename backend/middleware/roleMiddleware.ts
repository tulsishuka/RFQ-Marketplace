
import { Response, NextFunction } from "express";
import { AuthRequest } from "./authMiddleware";

type UserRole = "buyer" | "supplier";

const roleMiddleware = (allowedRole: UserRole) => {
  return (
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ): void => {
    if (!req.user) {
      res.status(401).json({
        message: "Authentication required",
      });
      return;
    }

    if (req.user.role !== allowedRole) {
      res.status(403).json({
        message: `Access denied. Only ${allowedRole}s can perform this action.`,
      });
      return;
    }

    next();
  };
};

export default roleMiddleware;

