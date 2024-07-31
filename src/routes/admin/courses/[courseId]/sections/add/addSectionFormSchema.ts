import {
  nameSchemaField,
  slugSchemaField
} from "$lib/forms/sharedSchemaFields";
import { z } from "zod";

// Define outside the load function so the adapter can be cached
export const addSectionFormSchema = z.object({
  name: nameSchemaField,
  slug: slugSchemaField,
  courseId: z.number().int(),
  courseSlug: z.string()
});
