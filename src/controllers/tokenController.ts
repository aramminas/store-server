import { NextFunction, Response } from "express";

import { handleResponse } from "../utils/controller";
import { generateAccessToken } from "../utils/tokens";
import { RequestWithUser, UserDtoT } from "../types/common";

export const authToken = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req?.user) {
      return handleResponse(res, 401, "You are not authenticated!");
    }

    const newAccessToken = generateAccessToken(req.user as UserDtoT);

    return handleResponse(res, 200, "token successfully updated", {
      accessToken: newAccessToken,
    });
  } catch (err) {
    next(err);
  }
};
