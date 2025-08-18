import { db } from "$lib/server/db/client";
import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async ({ params }) => {
  const subsection = await db.query.subsection.findFirst({
    where: (subsection, { eq }) =>
      eq(subsection.id, parseInt(params.subsectionId)),
    columns: {
      id: true,
      name: true,
      slug: true
    }
  });

  return {
    subsection
  };
};

