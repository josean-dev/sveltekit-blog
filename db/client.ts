import { drizzle } from "drizzle-orm/postgres-js";
import * as schema from "./schema";
import postgres from "postgres";

const connectionString = process.env.DB_URL;

if (!connectionString) throw new Error("Database url not defined");

export const connection = postgres(connectionString, {
  prepare: false
});

export const db = drizzle(connection, { schema });
