import { db } from "$lib/server/db/client";
import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async ({ params }) => {
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
