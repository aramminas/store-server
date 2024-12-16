import pkg from "pg";
const { Pool } = pkg;

import { databaseConfigs } from "../configs/databaseConfigs";

const pool = new Pool(databaseConfigs);

pool.on("connect", () => {
  console.log("Connection pool established with Database");
});

export default pool;
