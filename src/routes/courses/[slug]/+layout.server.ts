import { db } from "$lib/server/db/client";
import type { LayoutServerLoad } from "../[slug]/$types";

export const load: LayoutServerLoad = async () => {
  const course = await db.query.course.findFirst({
    columns: {
      id: true,
      name: true,
      slug: true
    },
    with: {
      sections: {
        columns: {
          id: true,
          name: true,
          slug: true
        },
        with: {
          subsections: {
            columns: {
              id: true,
              name: true,
              slug: true,
              vimeoVideoId: true,
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
