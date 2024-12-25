import dotenv from "dotenv";
dotenv.config();

export const nodeMode = {
  dev: "development",
  prod: "production",
};

// Server
const defaultPort = 3001;
export const port = process.env.PORT || defaultPort;
export const nodeEnv = process.env.NODE_ENV || nodeMode.prod;
export const jwtSecret = process.env.JWT_SECRET || "";
export const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET || "";

// Databse
export const dbUser = process.env.DB_USER || "";
export const dbHost = process.env.DB_HOST || "";
export const dbName = process.env.DB_NAME || "";
export const dbPassword = process.env.DB_PASSWORD || "";
export const dbPort = Number(process.env.DB_PORT) || 0;
// Client
export const devClientUrl = process.env.DEV_CLIENT_URL || "";
export const prodClientUrl = process.env.PROD_CLIENT_URL || "";
