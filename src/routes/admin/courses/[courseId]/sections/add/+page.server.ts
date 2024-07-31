import { message, superValidate } from "sveltekit-superforms";
import { zod } from "sveltekit-superforms/adapters";
import { fail, redirect } from "@sveltejs/kit";
import { addSectionFormSchema } from "./addSectionFormSchema";
import { db } from "$lib/server/db/client";
import { section, SelectSection } from "$lib/server/db/schema";
import { PostgresError } from "postgres";

export const load = async () => {
  const form = await superValidate(zod(addSectionFormSchema));

  // Always return { form } in load functions
  return { form };
};

export const actions = {
  default: async ({ request }) => {
    const form = await superValidate(
      request,
      zod(addSectionFormSchema)
    );

    if (!form.valid) {
      // Again, return { form } and things will just work.
      return fail(400, { form });
    }

    let createdSection: SelectSection | undefined = undefined;

    try {
      const insertedSections = await db
        .insert(section)
        .values({
          name: form.data.name,
          slug: form.data.slug,
          courseId: form.data.courseId
        })
        .returning();

      createdSection = insertedSections[0];
    } catch (err) {
      if (err instanceof PostgresError) {
        if (err.constraint_name === "section_slug_unique") {
          // Will also return fail, since status is >= 400
          // form.valid will also be set to false.
          return message(
            form,
            "A section with this slug already exists.",
            {
              status: 400
            }
          );
        } else {
          return message(
            form,
            "Something went wrong creating section.",
            {
              status: 400
            }
          );
        }
      }
    }

    if (createdSection) {
      throw redirect(303, `/admin/courses/${form.data.courseId}`);
    }
  }
};
