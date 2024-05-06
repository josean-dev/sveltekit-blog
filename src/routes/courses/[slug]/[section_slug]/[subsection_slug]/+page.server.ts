import { db } from "$lib/server/db/client";
import type { LayoutServerLoad } from "../../$types";

export const load: LayoutServerLoad = async () => {
  const subsection = await db.query.subsection.findFirst({
    columns: {
      id: true,
      name: true,
      slug: true,
      vimeoVideoId: true,
      videoLength: true
    }
  });

  return {
    subsection
  };
};
