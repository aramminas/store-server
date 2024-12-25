import { Response, NextFunction, Request } from "express";
import jwt from "jsonwebtoken";

import { jwtSecret } from "../configs/envVars";
import { handleResponse } from "../utils/controller";
import { RequestWithUser } from "../types/common";

export const authenticateToken = (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  const bearerToken = req.headers["authorization"];
  if (!bearerToken) {
    return handleResponse(res, 401, "Access Denied. No token provided.");
  }

  const token = bearerToken.split(" ")[1];

  try {
    jwt.verify(token, jwtSecret, (err: any, data: any) => {
      if (err) {
        return handleResponse(res, 403, "Invalid or expired token.");
      }

      if (data?.user) {
        req.user = data.user;
      }

      next();
    });
  } catch (error) {
    return handleResponse(res, 400, "Invalid Token.");
  }
};
