import { Response } from "express";
import jwt from "jsonwebtoken";

import {
  refreshTokenKey,
  tokenExpiresTime,
  refreshTokenExpiresTime,
  refreshTokenCookieExpiresTime,
} from "../configs";
import { UserDtoT } from "../types/common";
import { jwtSecret, refreshTokenSecret } from "../configs/envVars";

export const jwtUserData = (user: UserDtoT) => {
  return {
    user: {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    },
  };
};

export const generateAccessToken = (user: UserDtoT) => {
  return jwt.sign({ ...jwtUserData(user) }, jwtSecret, {
    expiresIn: tokenExpiresTime,
  });
};

export const generateRefreshToken = (user: UserDtoT) => {
  return jwt.sign({ ...jwtUserData(user) }, refreshTokenSecret, {
    expiresIn: refreshTokenExpiresTime,
  });
};

export const jwtTokenGenerator = (user: UserDtoT) => ({
  accessToken: generateAccessToken(user),
  refreshToken: generateRefreshToken(user),
});

export const jwtTokenSetCookie = (res: Response, refreshToken: string) => {
  res.cookie(refreshTokenKey, refreshToken, {
    httpOnly: true,
    maxAge: refreshTokenCookieExpiresTime,
  });
};

export const jwtTokenClearCookie = (res: Response) => {
  res.clearCookie(refreshTokenKey);
};
