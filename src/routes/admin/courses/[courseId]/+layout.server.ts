import { db } from "$lib/server/db/client";
import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async ({ params }) => {
  const course = await db.query.course.findFirst({
    where: (course, { eq }) =>
      eq(course.id, parseInt(params.courseId)),
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
