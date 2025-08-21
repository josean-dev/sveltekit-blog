import { fail, message, superValidate } from "sveltekit-superforms";
import { zod } from "sveltekit-superforms/adapters";
import { subsectionFormSchema } from "../subsectionFormSchema";
import {
  type SelectSubsection,
  subsection
} from "$lib/server/db/schema";
import { db } from "$lib/server/db/client";
import { redirect } from "@sveltejs/kit";
import { isDBError } from "$lib/server/db/errors";

export const load = async () => {
  const form = await superValidate(zod(subsectionFormSchema));

  // Always return { form } in load functions
  return { form };
};

export const actions = {
  submit: async ({ request, params }) => {
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
          sectionId: parseInt(params.sectionId),
          ...form.data
        })
        .returning();

      createdSubsection = insertedSubsections[0];
    } catch (err) {
      if (isDBError(err)) {
        if (err.cause.constraint === "subsection_slug_unique") {
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
      redirect(
        303,
        `/admin/courses/${params.courseId}/sections/${params.sectionId}`
      );
    }
  }
};
