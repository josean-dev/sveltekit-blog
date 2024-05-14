import { db } from "$lib/server/db/client";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ params }) => {
  const subsection = await db.query.subsection.findFirst({
    where: (subsection, { eq }) =>
      eq(subsection.slug, params.subsection_slug),
    columns: {
      id: true,
      vimeoVideoId: true,
      name: true
    }
  });

  return {
    subsection
  };
};
