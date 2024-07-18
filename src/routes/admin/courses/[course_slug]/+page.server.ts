import { db } from "$lib/server/db/client";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ params }) => {
  const course = await db.query.course.findFirst({
    where: (course, { eq }) => eq(course.slug, params.course_slug),
    columns: {
      id: true,
      name: true,
      slug: true
    }
  });

  return {
    course
  };
};
