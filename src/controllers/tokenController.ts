import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

import { handleResponse } from "../utils/controller";
import { refreshTokenSecret } from "../configs/envVars";
import { generateAccessToken, jwtUserData } from "../utils/tokens";

export const authToken = async (
  req: Request,
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

        const newAccessToken = generateAccessToken(data.user);

        return handleResponse(res, 200, "token successfully updated", {
          accessToken: newAccessToken,
        });
      }
    );
  } catch (err) {
    next(err);
  }
};
