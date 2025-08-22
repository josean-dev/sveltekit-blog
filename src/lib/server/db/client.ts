import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";
import * as schema from "./schema";
import * as authSchema from "./authSchema";

const connectionString = process.env.DB_URL;

if (!connectionString) throw new Error("Database url not defined");

export const db = drizzle(connectionString, {
  schema: { ...schema, ...authSchema }
});

export const pool = db.$client;
