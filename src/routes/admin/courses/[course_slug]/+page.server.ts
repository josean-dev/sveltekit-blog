import { db } from "$lib/server/db/client";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ params }) => {
  const course = await db.query.course.findFirst({
    where: (course, { eq }) => eq(course.slug, params.course_slug),
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

  return {
    sections: course?.sections
  };
};
