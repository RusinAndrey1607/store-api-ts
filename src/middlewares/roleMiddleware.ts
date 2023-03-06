import { NextFunction, Request, Response } from "express";
export interface UserRequest extends Request {
  user: {
    role: string;
    email: string;
    id: number;
  };
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
      // @ts-ignore
      const decoded = jwt.verify(token, process.env.JWT_SECRET || "JWT_SECRET");
      if (decoded.role !== role) {
        return res.status(401).json({ message: "User aren't allowe" });
      }
      // @ts-ignore
      req.user = decoded;
      next();
    } catch (error) {
      return res.status(401).json({ message: "User isn't authorized" });
    }
  };
};
