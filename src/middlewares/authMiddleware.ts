import { NextFunction, Request, Response } from "express";
export interface UserRequest extends Request {
  user: {
    role: string;
    email: string;
    id: number;
    basket_id:number
  };
}
export const AuthMiddleware = (
  req: UserRequest,
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
    // @ts-ignore
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "JWT_SECRET");
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: "User isn't authorized" });
  }
};
