import "dotenv/config";
import type { Config } from "drizzle-kit";

const dbUrl = process.env.DB_URL;

if (!dbUrl) throw Error("Database url not defined");

export default {
  schema: "./db/schema.ts",
  out: "./db/drizzle",
  driver: "pg", // 'pg' | 'mysql2' | 'better-sqlite' | 'libsql' | 'turso'
  dbCredentials: {
    connectionString: dbUrl
  }
} satisfies Config;
