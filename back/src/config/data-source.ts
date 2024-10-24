import { DataSource } from "typeorm";

import {
  DB_DATABASE,
  DB_DROP,
  DB_HOST,
  DB_LOGGING,
  DB_PASSWORD,
  DB_PORT,
  DB_SYNC,
  DB_USERNAME,
} from "./envs";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: DB_HOST,
  port: DB_PORT,
  username: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_DATABASE,
  synchronize: DB_SYNC,
  logging: DB_LOGGING,
  entities: ["src/entities/*.entity.ts"],
  dropSchema: DB_DROP,
});
