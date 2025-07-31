import { DrizzleQueryError } from "drizzle-orm/errors";
import { DatabaseError } from "pg";

export function isDBError(
  err: unknown
): err is DrizzleQueryError & { cause: DatabaseError } {
  return (
    err instanceof DrizzleQueryError &&
    err.cause instanceof DatabaseError
  );
}
