import "dotenv/config";
import type { Config } from "drizzle-kit";

const dbUrl = process.env.DB_URL;

if (!dbUrl) throw Error("Database url not defined");

export default {
  schema: "./src/lib/server/db/schema.ts",
  out: "./src/lib/server/db/drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: dbUrl
  }
} satisfies Config;
