import { message, superValidate } from "sveltekit-superforms";
import { zod } from "sveltekit-superforms/adapters";
import { fail, redirect } from "@sveltejs/kit";
import { schema } from "./formSchema";
import { db } from "$lib/server/db/client";
import { course, SelectCourse } from "$lib/server/db/schema";
import { PostgresError } from "postgres";

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

    let createdCourse: SelectCourse | undefined = undefined;

    try {
      const insertedCourses = await db
        .insert(course)
        .values({
          name: form.data.name,
          slug: form.data.slug
        })
        .returning();

      createdCourse = insertedCourses[0];
    } catch (err) {
      if (err instanceof PostgresError) {
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
            "Something went wrong creating course.",
            {
              status: 400
            }
          );
        }
      }
    }

    if (createdCourse) {
      throw redirect(303, `/admin/courses/${createdCourse.slug}`);
    }
  }
};