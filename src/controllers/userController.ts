import { UserRequest } from "./../middlewares/authMiddleware";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { ApiError } from "../error/ApiError";
import { User } from "../models/user.model";
import bcrypt from "bcrypt";
import { Basket } from "../models/basket.model";
import { validationResult } from "express-validator";

const generateJwt = (payload: {
  id: number;
  email: string;
  role: string;
  basket_id: number;
}) => {
  return jwt.sign(payload, process.env.JWT_SECRET || "JWT_SECRET", {
    expiresIn: "24h",
  });
};

class UserController {
  async create(req: Request, res: Response, next: NextFunction) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(404).json({ errors: errors.array() });
    }
    let { email, password, role } = req.body;
    if (!email || !password) {
      return next(ApiError.badRequest("Incorrect email or password"));
    }
    const candidate = await User.findByEmail(email);
    if (candidate) {
      return next(ApiError.badRequest("Email already used"));
    }
    const hashPassword = await bcrypt.hash(password, 5);
    const user = await User.create({
      email,
      password: hashPassword,
      role: role || "USER",
    });
    const basket = await Basket.create(user.id);
    const token = generateJwt({
      id: user.id,
      email,
      role,
      basket_id: basket.id,
    });
    return res.json({ token });
  }
  async login(req: Request, res: Response, next: NextFunction) {
    let { email, password } = req.body;
    const user = await User.findByEmail(email);

    if (!user) {
      return next(ApiError.badRequest(`User with email ${email} not found`));
    }
    let comparePassword = await bcrypt.compare(password, user.password);

    if (!comparePassword) {
      return next(ApiError.badRequest(`Incorrect password`));
    }
    const basket = await Basket.findByUserId(user.id);
    const token = generateJwt({
      id: user.id,
      email,
      role: user.role,
      basket_id: basket.id,
    });
    return res.json({ token });
  }
  async check(req: UserRequest, res: Response, next: NextFunction) {
    const { id, email, role, basket_id } = req.user;
    const token = generateJwt({ id, role, email, basket_id });
    return res.json({ token });
  }
}
export const userController = new UserController();
