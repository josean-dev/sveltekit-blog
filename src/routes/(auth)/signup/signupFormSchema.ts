import { passwordSchemaVerbose } from "$lib/forms/sharedSchemaFields";
import { z } from "zod";

export const signupFormSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email(),
    password: passwordSchemaVerbose,
    confirmPassword: z.string()
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"]
  });
