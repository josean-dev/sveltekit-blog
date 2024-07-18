import { z } from "zod";

// Define outside the load function so the adapter can be cached
export const schema = z.object({
  name: z.string(),
  slug: z.string().regex(/^[a-z0-9]+(-[a-z0-9]+)*$/, {
    message: "Slug must be lowercase words/digits separated by dashes"
  })
});
