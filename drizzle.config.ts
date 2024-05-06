import "dotenv/config";
import type { Config } from "drizzle-kit";

const dbUrl = process.env.DB_URL;

if (!dbUrl) throw Error("Database url not defined");

export default {
  schema: "./src/lib/server/db/schema.ts",
  out: "./src/lib/server/db/drizzle",
  driver: "pg", // 'pg' | 'mysql2' | 'better-sqlite' | 'libsql' | 'turso'
  dbCredentials: {
    connectionString: dbUrl
  }
} satisfies Config;
