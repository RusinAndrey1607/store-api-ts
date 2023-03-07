import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export interface UserRequest extends Request {
  user: {
    role: string;
    email: string;
    id: number;
    basket_id: number;
  };
}
export const AuthMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
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
    req.user = decoded;
    next();
  } catch (error) {
    console.log(error);

    return res.status(401).json({ message: "User isn't authorized" });
  }
};
