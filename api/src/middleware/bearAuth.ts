// src/middleware/bearAuth.ts
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { Request, Response, NextFunction } from "express";

dotenv.config();

// JWT payload interface
interface JwtPayload {
  userid: number;
  role: "admin" | "developer" | "tester";
}

// Extract authenticated user (you already had this)
export const getAuthUser = (req: Request) => {
  const user = (req as any).user;
  return { userId: user.userid, role: user.role };
};

// Main middleware factory
export const checkroles = (
  requiredRole:
    | "admin"
    | "developer"
    | "tester"
    | "admin & developer"
    | "all"
) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      res.status(401).json({ message: "Unauthorized: No token provided" });
      return;
    }

    const token = authHeader.split(" ")[1];

    try {
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET as string
      ) as JwtPayload;

      (req as any).user = decoded; // attach user object

      // Missing role
      if (!decoded.role) {
        res.status(401).json({ message: "Invalid token payload" });
        return;
      }

      // Allow all roles
      if (requiredRole === "all") {
        next();
        return;
      }

      // Allow admin or developer
      if (requiredRole === "admin & developer") {
        if (decoded.role === "admin" || decoded.role === "developer") {
          next();
          return;
        }
      }

      // Allow specific single role
      if (decoded.role === requiredRole) {
        next();
        return;
      }

      res.status(403).json({ message: "Forbidden" });
    } catch (error) {
      res.status(401).json({ message: "Invalid or expired token" });
    }
  };
};

// Role shortcuts
export const adminOnly = checkroles("admin");
export const developerOnly = checkroles("developer");
export const testerOnly = checkroles("tester");
export const adminOrDeveloper = checkroles("admin & developer");
export const allRoles = checkroles("all");
