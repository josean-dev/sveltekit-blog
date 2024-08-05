import {
  nameSchemaField,
  slugSchemaField
} from "$lib/forms/sharedSchemaFields";
import { z } from "zod";

// Define outside the load function so the adapter can be cached
export const subsectionFormSchema = z.object({
  id: z.number().int().optional(),
  name: nameSchemaField,
  slug: slugSchemaField
});

export type SubsectionFormSchema = typeof subsectionFormSchema;
