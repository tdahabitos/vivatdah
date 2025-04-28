import { NextFunction } from "express";
import { errorMessages } from "../utils/error-messages.js";

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  /* const accessToken = req.headers.authorization.split(" ")[1]; // Bearer <token>

  if (!accessToken) {
    return res.status(401).json(errorMessages["401"]);
  }

  const userId = await verifyIdToken(accessToken);

  if (!userId) {
    return res.status(401).json(errorMessages["401"]);
  }
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  req.userId = user.id;
  req.tenantId = user.tenantId; */
  next();
};
