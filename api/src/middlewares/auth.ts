import { NextFunction } from "express";
import { errorMessages } from "../utils/error-messages.js";
import { createClient } from "@supabase/supabase-js";

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  const accessToken = req.headers.Authorization.split(" ")[1]; // Bearer <token>

  console.log(accessToken);

  const supabase = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  supabase.auth.getSession().then(async ({ data: { session } }) => {});
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
