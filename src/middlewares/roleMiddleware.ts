import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

interface JWTPayLoad {
  role: string;
  email: string;
  id: number;
  basket_id: number;
}
export interface UserRequest extends Request {
  user: JWTPayLoad;
}
export const RoleMiddleware = (role: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (req.method == "OPTIONS") {
      next();
    }
    try {
      // @ts-ignore
      const token = req.headers.authorization.split(" ")[1];
      if (!token) {
        return res.status(401).json({ message: "User isn't authorized" });
      }
      const decoded = jwt.verify(token, process.env.JWT_SECRET || "JWT_SECRET");
      // @ts-ignore
      if (decoded.role !== role) {
        // @ts-ignore
        console.log(decoded.role, role);

        return res.status(401).json({ message: "User aren't allowed" });
      }
      // @ts-ignore
      req.user = decoded;
      next();
    } catch (error) {
      return res.status(401).json({ message: "User isn't authorized" });
    }
  };
};
