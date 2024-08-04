import { db } from "$lib/server/db/client";
import { count, eq } from "drizzle-orm";
import { course, section } from "$lib/server/db/schema";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async () => {
  const coursesCount = await db
    .select({ count: count() })
    .from(course);

  const courses = await db
    .select({
      id: course.id,
      name: course.name,
      slug: course.slug,
      createdAt: course.createdAt,
      updatedAt: course.updatedAt,
      sectionsCount: count(section.id)
    })
    .from(course)
    .leftJoin(section, eq(course.id, section.courseId))
    .groupBy(course.id)
    .orderBy(course.createdAt);

  return {
    coursesCount,
    courses
  };
};
