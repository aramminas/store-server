import { Knex } from "knex";

import { databaseConfigs } from "./src/configs/databaseConfigs";

const config: Knex.Config = {
  client: "pg",
  connection: databaseConfigs,
  migrations: {
    directory: "./src/database/migrations",
  },
  seeds: {
    directory: "./src/database/seeds",
  },
};

export default config;
