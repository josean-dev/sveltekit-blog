import { db } from "$lib/server/db/client";
import { fail, message, superValidate } from "sveltekit-superforms";
import type { PageServerLoad } from "./$types";
import { zod } from "sveltekit-superforms/adapters";
import { sectionFormSchema } from "../sectionFormSchema";
import { section } from "$lib/server/db/schema";
import { eq } from "drizzle-orm";
import { PostgresError } from "postgres";

export const load: PageServerLoad = async ({ params }) => {
  const section = await db.query.section.findFirst({
    where: (section, { eq }) =>
      eq(section.id, parseInt(params.sectionId)),
    columns: {
      id: true,
      name: true,
      slug: true
    },
    with: {
      subsections: {
        orderBy: (subsection, { asc }) => [asc(subsection.createdAt)],
        columns: {
          id: true,
          slug: true,
          name: true,
          videoLength: true,
          updatedAt: true
        }
      }
    }
  });

  const form = await superValidate(zod(sectionFormSchema));

  return {
    section,
    form
  };
};

export const actions = {
  default: async ({ request }) => {
    const form = await superValidate(request, zod(sectionFormSchema));

    if (!form.valid) {
      // Again, return { form } and things will just work.
      return fail(400, { form });
    }

    try {
      await db
        .update(section)
        .set({
          name: form.data.name,
          slug: form.data.slug
        })
        .where(eq(section.id, form.data.id!))
        .returning();
    } catch (err) {
      console.log(err);
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
            "Something went wrong updating section.",
            {
              status: 400
            }
          );
        }
      }
    }

    return { form };
  }
};
