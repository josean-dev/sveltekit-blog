import { db } from "$lib/server/db/client";
import { count, eq } from "drizzle-orm";
import type { PageServerLoad } from "./$types";
import { course, section } from "$lib/server/db/schema";

export const load: PageServerLoad = async () => {
  const coursesCount = await db
    .select({ count: count() })
    .from(course);

  const courses = await db
    .select({
      id: course.id,
      name: course.name,
      slug: course.slug,
      sectionsCount: count(section.id)
    })
    .from(course)
    .leftJoin(section, eq(course.id, section.courseId))
    .groupBy(course.id)
    .orderBy(course.name);

  return {
    coursesCount,
    courses
  };
};
