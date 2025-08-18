import { subsectionFormSchema } from "../subsectionFormSchema";
import { zod } from "sveltekit-superforms/adapters";
import { fail, message, superValidate } from "sveltekit-superforms";
import { db } from "$lib/server/db/client";
import type { PageServerLoad } from "./$types";
import { subsection } from "$lib/server/db/schema";
import { eq } from "drizzle-orm";
import { isDBError } from "$lib/server/db/errors";

export const load: PageServerLoad = async ({ parent }) => {
  const { subsection } = await parent();

  const form = await superValidate(
    subsection,
    zod(subsectionFormSchema)
  );

  return {
    form
  };
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

    try {
      await db
        .update(subsection)
        .set({
          name: form.data.name,
          slug: form.data.slug
        })
        .where(eq(subsection.id, parseInt(params.subsectionId)));
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
            "Something went wrong updating subsection.",
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

