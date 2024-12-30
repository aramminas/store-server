import { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

import { RequestWithUser } from "../types/common";
import { handleResponse } from "../utils/controller";
import { refreshTokenSecret } from "../configs/envVars";

export const verifyRefreshToken = (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  const cookies = req.cookies;

  try {
    if (!cookies.refreshToken) {
      return handleResponse(res, 401, "You are not authenticated!");
    }

    jwt.verify(
      cookies.refreshToken,
      refreshTokenSecret,
      (err: any, data: any) => {
        if (err) {
          return handleResponse(res, 403, "Invalid refresh token");
        }

        if (data?.user) {
          req.user = data?.user;
        }

        next();
      }
    );
  } catch (err) {
    return handleResponse(res, 400, "Invalid refresh token.");
  }
};
