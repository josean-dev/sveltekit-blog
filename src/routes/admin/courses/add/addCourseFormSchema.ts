import {
  nameSchemaField,
  slugSchemaField
} from "$lib/utils/forms/sharedSchemaFields";
import { z } from "zod";

// Define outside the load function so the adapter can be cached
export const addCourseFormSchema = z.object({
  name: nameSchemaField,
  slug: slugSchemaField
});
