import jwt from "jsonwebtoken";

import { UserDtoT } from "../types/common";
import { jwtSecret, refreshTokenSecret } from "../configs/envVars";
import { tokenExpiresTime, refreshTokenExpiresTime } from "../configs";

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
