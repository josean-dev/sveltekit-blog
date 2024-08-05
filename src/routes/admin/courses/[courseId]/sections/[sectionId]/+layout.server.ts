import { db } from "$lib/server/db/client";
import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async ({ params }) => {
  const section = await db.query.section.findFirst({
    where: (section, { eq }) =>
      eq(section.id, parseInt(params.sectionId)),
    columns: {
      id: true,
      name: true,
      slug: true
    }
  });

  return {
    section
  };
};
