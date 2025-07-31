import { db } from "$lib/server/db/client";
import { fail, message, superValidate } from "sveltekit-superforms";
import { zod } from "sveltekit-superforms/adapters";
import { courseFormSchema } from "../courseFormSchema";
import { course } from "$lib/server/db/schema";
import { eq } from "drizzle-orm";
import postgres from "postgres";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ params, parent }) => {
  const sections = await db.query.section.findMany({
    where: (section, { eq }) =>
      eq(section.courseId, parseInt(params.courseId)),
    columns: {
      id: true,
      slug: true,
      name: true,
      updatedAt: true
    },
    orderBy: (section, { asc }) => [asc(section.createdAt)],
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

  const { course } = await parent();

  const form = await superValidate(course, zod(courseFormSchema));

  return {
    sections,
    form
  };
};

export const actions = {
  default: async ({ request, params }) => {
    const form = await superValidate(request, zod(courseFormSchema));

    if (!form.valid) {
      // Again, return { form } and things will just work.
      return fail(400, { form });
    }

    try {
      await db
        .update(course)
        .set({
          name: form.data.name,
          slug: form.data.slug
        })
        .where(eq(course.id, parseInt(params.courseId)));
    } catch (err) {
      console.log(err);
      if (err instanceof postgres.PostgresError) {
        if (err.constraint_name === "course_slug_unique") {
          // Will also return fail, since status is >= 400
          // form.valid will also be set to false.
          return message(
            form,
            "A course with this slug already exists.",
            {
              status: 400
            }
          );
        } else {
          return message(
            form,
            "Something went wrong updating course.",
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
