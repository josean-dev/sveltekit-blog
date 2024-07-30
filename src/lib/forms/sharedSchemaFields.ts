import { z } from "zod";

export const slugSchemaField = z
  .string()
  .trim()
  .min(1, "Slug is required")
  .regex(/^[a-z0-9]+(-[a-z0-9]+)*$/, {
    message: "Slug must be lowercase words/digits separated by dashes"
  });

export const nameSchemaField = z
  .string()
  .trim()
  .min(1, "Name is required");
