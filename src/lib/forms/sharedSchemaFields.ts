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

export const passwordSchemaVerbose = z
  .string()
  .min(8, "Password must be at least 8 characters")
  .refine((password) => /[a-z]/.test(password), {
    message: "Password must contain at least one lowercase letter"
  })
  .refine((password) => /[A-Z]/.test(password), {
    message: "Password must contain at least one uppercase letter"
  })
  .refine((password) => /\d/.test(password), {
    message: "Password must contain at least one digit"
  })
  .refine((password) => /[@$!%*?#&]/.test(password), {
    message:
      "Password must contain at least one special character (@$#!%*?&)"
  })
  .refine((password) => /^[A-Za-z\d@$#!%*?&]+$/.test(password), {
    message:
      "Password can only contain letters, digits, and special characters (@$#!%*?&)"
  });
