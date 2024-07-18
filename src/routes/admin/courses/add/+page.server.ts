import { superValidate } from "sveltekit-superforms";
import { zod } from "sveltekit-superforms/adapters";
import { fail, redirect } from "@sveltejs/kit";
import { schema } from "./formSchema";
import { db } from "$lib/server/db/client";
import { course } from "$lib/server/db/schema";

export const load = async () => {
  const form = await superValidate(zod(schema));

  // Always return { form } in load functions
  return { form };
};

export const actions = {
  default: async ({ request }) => {
    const form = await superValidate(request, zod(schema));

    if (!form.valid) {
      // Again, return { form } and things will just work.
      return fail(400, { form });
    }

    const [createdCourse] = await db
      .insert(course)
      .values({
        name: form.data.name,
        slug: form.data.slug
      })
      .returning();

    throw redirect(303, `/admin/courses/${createdCourse.slug}`);

    return { form, createdCourse };
  }
};
