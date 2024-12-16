import pkg from "pg";

import { dbUser, dbHost, dbName, dbPassword, dbPort } from "../configs/envVars";

export const databaseConfigs: pkg.PoolConfig = {
  user: dbUser,
  host: dbHost,
  database: dbName,
  password: dbPassword,
  port: dbPort,
};
