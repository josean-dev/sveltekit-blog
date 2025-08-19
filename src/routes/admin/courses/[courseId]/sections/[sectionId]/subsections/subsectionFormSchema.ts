import {
  nameSchemaField,
  slugSchemaField
} from "$lib/forms/sharedSchemaFields";
import { z } from "zod";

// Define outside the load function so the adapter can be cached
export const subsectionFormSchema = z.object({
  name: nameSchemaField,
  slug: slugSchemaField,
  vimeoVideoId: z.string().trim().length(9).optional(),
  videoLength: z.number().int().min(1).optional()
});

export type SubsectionFormSchema = typeof subsectionFormSchema;
