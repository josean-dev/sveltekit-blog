import { message, superValidate } from "sveltekit-superforms";
import { zod } from "sveltekit-superforms/adapters";
import { fail, redirect } from "@sveltejs/kit";
import { courseFormSchema } from "../courseFormSchema";
import { db } from "$lib/server/db/client";
import { course, type SelectCourse } from "$lib/server/db/schema";
import { DrizzleQueryError } from "drizzle-orm/errors";
import { DatabaseError } from "pg";
import { isDBError } from "$lib/server/db/errors";

export const load = async () => {
  const form = await superValidate(zod(courseFormSchema));

  // Always return { form } in load functions
  return { form };
};

export const actions = {
  default: async ({ request }) => {
    const form = await superValidate(request, zod(courseFormSchema));

    if (!form.valid) {
      // Again, return { form } and things will just work.
      return fail(400, { form });
    }

    let createdCourse: SelectCourse | undefined = undefined;

    try {
      const insertedCourses = await db
        .insert(course)
        .values(form.data)
        .returning();

      createdCourse = insertedCourses[0];
    } catch (err) {
      if (isDBError(err)) {
        if (err.cause.constraint === "course_slug_unique") {
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
      redirect(303, `/admin/courses/${createdCourse.id}`);
    }
  }
};
