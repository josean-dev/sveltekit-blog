import { passwordSchemaVerbose } from "$lib/forms/sharedSchemaFields";
import { z } from "zod";

export const loginFormSchema = z.object({
  email: z.string().email(),
  password: passwordSchemaVerbose
});
