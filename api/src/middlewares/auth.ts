import { NextFunction } from "express";
import { errorMessages } from "../utils/error-messages.js";

export const auth = async (
  req: Express.Request,
  res: Response,
  next: NextFunction
) => {
  req.user_id = "19ba1e80-c9f9-4dcb-a248-a7fa3b8561e3"
  next();
};
