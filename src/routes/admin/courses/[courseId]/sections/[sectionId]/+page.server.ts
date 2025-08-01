import { db } from "$lib/server/db/client";
import { fail, message, superValidate } from "sveltekit-superforms";
import type { PageServerLoad } from "./$types";
import { zod } from "sveltekit-superforms/adapters";
import { sectionFormSchema } from "../sectionFormSchema";
import { section } from "$lib/server/db/schema";
import { eq } from "drizzle-orm";
import { isDBError } from "$lib/server/db/errors";

export const load: PageServerLoad = async ({ params, parent }) => {
  const subsections = await db.query.subsection.findMany({
    where: (subsection, { eq }) =>
      eq(subsection.sectionId, parseInt(params.sectionId)),
    orderBy: (subsection, { asc }) => [asc(subsection.createdAt)],
    columns: {
      id: true,
      slug: true,
      name: true,
      videoLength: true,
      updatedAt: true
    }
  });

  const { section } = await parent();

  const form = await superValidate(section, zod(sectionFormSchema));

  return {
    subsections,
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
        .where(eq(section.id, form.data.id!));
    } catch (err) {
      if (isDBError(err)) {
        if (err.cause.constraint === "section_slug_unique") {
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
