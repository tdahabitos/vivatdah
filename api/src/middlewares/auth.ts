import { NextFunction } from "express";
import { errorMessages } from "../utils/error-messages.js";

export const auth = async (
  req: Express.Request,
  res: Response,
  next: NextFunction
) => {
  next();
};
