import { db } from "$lib/server/db/client";
import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async ({ params }) => {
  const course = await db.query.course.findFirst({
    where: (course, { eq }) => eq(course.slug, params.course_slug),
    columns: {
      id: true,
      slug: true
    },
    with: {
      sections: {
        columns: {
          id: true,
          slug: true,
          name: true
        },
        with: {
          subsections: {
            columns: {
              id: true,
              slug: true,
              name: true,
              videoLength: true
            }
          }
        }
      }
    }
  });

  return {
    course
  };
};
