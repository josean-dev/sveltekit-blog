import {
  nameSchemaField,
  slugSchemaField
} from "$lib/forms/sharedSchemaFields";
import { z } from "zod";

// Define outside the load function so the adapter can be cached
export const sectionFormSchema = z.object({
  id: z.number().int().optional(),
  name: nameSchemaField,
  slug: slugSchemaField,
  courseId: z.number().int()
});

export type SectionFormSchema = typeof sectionFormSchema;
