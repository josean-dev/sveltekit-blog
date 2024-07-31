import { db } from "$lib/server/db/client";
import { fail, message, superValidate } from "sveltekit-superforms";
import { zod } from "sveltekit-superforms/adapters";
import { courseFormSchema } from "../courseFormSchema";
import { course, SelectCourse } from "$lib/server/db/schema";
import { eq } from "drizzle-orm";
import { PostgresError } from "postgres";
import { invalidate } from "$app/navigation";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ params }) => {
  const course = await db.query.course.findFirst({
    where: (course, { eq }) =>
      eq(course.id, parseInt(params.courseId)),
    columns: {
      id: true,
      name: true,
      slug: true
    },
    with: {
      sections: {
        columns: {
          id: true,
          slug: true,
          name: true,
          updatedAt: true
        },
        with: {
          subsections: {
            columns: {
              id: true,
              slug: true,
              name: true,
              videoLength: true,
              updatedAt: true
            }
          }
        }
      }
    }
  });

  const form = await superValidate(course, zod(courseFormSchema));

  return {
    sections: course?.sections,
    form
  };
};

export const actions = {
  default: async ({ request }) => {
    const form = await superValidate(request, zod(courseFormSchema));

    if (!form.valid) {
      // Again, return { form } and things will just work.
      return fail(400, { form });
    }

    let updatedCourse: SelectCourse | undefined = undefined;

    try {
      const updatedCourses = await db
        .update(course)
        .set({
          name: form.data.name,
          slug: form.data.slug
        })
        .where(eq(course.id, form.data.id!))
        .returning();

      updatedCourse = updatedCourses[0];

      invalidate(`/admin/courses/${updatedCourse.slug}`);
    } catch (err) {
      console.log(err);
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
