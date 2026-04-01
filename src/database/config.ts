// src/infrastructure/database/data-source.ts
import { DataSource } from "typeorm";
import dotenv from "dotenv";

dotenv.config();

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not defined in environment variables");
}

export const AppDataSource = new DataSource({
  type: "postgres",
  url: process.env.DATABASE_URL,
  synchronize: false,
  logging: false,
  entities: ["src/infrastructure/entity/**/*.ts"],
  migrations: ["src/database/migrations/**/*.ts"],
  migrationsRun: true,
});

export default AppDataSource;