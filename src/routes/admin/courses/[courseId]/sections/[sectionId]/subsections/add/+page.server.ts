import { fail, message, superValidate } from "sveltekit-superforms";
import { zod } from "sveltekit-superforms/adapters";
import { subsectionFormSchema } from "../subsectionFormSchema";
import { SelectSubsection, subsection } from "$lib/server/db/schema";
import { db } from "$lib/server/db/client";
import { PostgresError } from "postgres";
import { redirect } from "@sveltejs/kit";

export const load = async () => {
  const form = await superValidate(zod(subsectionFormSchema));

  // Always return { form } in load functions
  return { form };
};

export const actions = {
  default: async ({ request, params }) => {
    const form = await superValidate(
      request,
      zod(subsectionFormSchema)
    );

    if (!form.valid) {
      // Again, return { form } and things will just work.
      return fail(400, { form });
    }

    let createdSubsection: SelectSubsection | undefined = undefined;

    try {
      const insertedSubsections = await db
        .insert(subsection)
        .values({
          name: form.data.name,
          slug: form.data.slug,
          sectionId: parseInt(params.sectionId)
        })
        .returning();

      createdSubsection = insertedSubsections[0];
    } catch (err) {
      if (err instanceof PostgresError) {
        if (err.constraint_name === "subsection_slug_unique") {
          // Will also return fail, since status is >= 400
          // form.valid will also be set to false.
          return message(
            form,
            "A subsection with this slug already exists.",
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

    if (createdSubsection) {
      throw redirect(
        303,
        `/admin/courses/${params.courseId}/sections/${params.sectionId}`
      );
    }
  }
};
