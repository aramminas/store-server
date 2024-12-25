import jwt from "jsonwebtoken";

import { UserDbT, UserDtoT } from "../types/common";
import { jwtSecret, refreshTokenSecret } from "../configs/envVars";
import { tokenExpiresTime, refreshTokenExpiresTime } from "../configs";

export const jwtUserData = (user: UserDbT | UserDtoT) => {
  if ("firstName" in user) {
    return { user };
  }

  return {
    user: {
      id: user.id,
      firstName: user.first_name,
      lastName: user.last_name,
      email: user.email,
    },
  };
};

export const generateAccessToken = (user: UserDbT | UserDtoT) => {
  return jwt.sign({ ...jwtUserData(user) }, jwtSecret, {
    expiresIn: tokenExpiresTime,
  });
};

export const generateRefreshToken = (user: UserDbT) => {
  return jwt.sign({ ...jwtUserData(user) }, refreshTokenSecret, {
    expiresIn: refreshTokenExpiresTime,
  });
};

export const jwtTokenGenerator = (user: UserDbT) => ({
  accessToken: generateAccessToken(user),
  refreshToken: generateRefreshToken(user),
});
