import { devClientUrl, prodClientUrl } from "./envVars";

export const corsOptions = {
  origin: [devClientUrl, prodClientUrl],
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

export const allowedFileTypes = ["image/jpeg", "image/png"];
export const maxFileSize = 2 * 1024 * 1024; // 2MB
export const passwordRegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/;
export const tokenExpiresTime = "15m";
export const refreshTokenExpiresTime = "1d";
export const refreshTokenKey = "refreshToken";
export const refreshTokenCookieExpiresTime = 24 * 60 * 60 * 1000; // 1 day
