import "dotenv/config";
import { db, pool } from "./client";
import { faker } from "@faker-js/faker";
import {
  type InsertCourse,
  type InsertSection,
  type InsertSubsection,
  course,
  section,
  subsection
} from "./schema";
import { capitalize } from "$lib/utils/strings";

const coursesInsertData: InsertCourse[] = [];

const usedSlugs = new Set<string>();

function getUniqueSlug() {
  let slug = faker.word.sample();

  while (usedSlugs.has(slug)) {
    slug = faker.word.sample();
  }

  usedSlugs.add(slug);

  return slug;
}

for (let i = 0; i < 5; i++) {
  const slug = getUniqueSlug();
  coursesInsertData.push({
    name: capitalize(slug),
    slug
  });
}

usedSlugs.clear();

await db.delete(course);
const insertedCourses = await db
  .insert(course)
  .values(coursesInsertData)
  .returning({
    id: course.id
  });

const sectionsInsertData: InsertSection[] = [];

insertedCourses.forEach((course) => {
  for (let i = 0; i < 3; i++) {
    const slug = getUniqueSlug();
    sectionsInsertData.push({
      name: capitalize(slug),
      slug,
      courseId: course.id
    });
  }
});

usedSlugs.clear();

await db.delete(section);
const insertedSections = await db
  .insert(section)
  .values(sectionsInsertData)
  .returning({ id: section.id });

const subsectionsInsertData: InsertSubsection[] = [];

insertedSections.forEach((section) => {
  const vimeoVideoIdOne = "942798419";
  const vimeoVideoOneLength = 77;
  const vimeoVideoIdTwo = "943297126";
  const vimeoVideoTwoLength = 10;
  for (let i = 0; i < 2; i++) {
    const isEven = i % 2 === 0;
    const vimeoVideoId = isEven ? vimeoVideoIdOne : vimeoVideoIdTwo;
    const vimeoVideoLength = isEven
      ? vimeoVideoOneLength
      : vimeoVideoTwoLength;
    const slug = getUniqueSlug();
    subsectionsInsertData.push({
      name: capitalize(slug),
      slug,
      vimeoVideoId: vimeoVideoId,
      videoLength: vimeoVideoLength,
      sectionId: section.id
    });
  }
});

usedSlugs.clear();

await db.delete(subsection);
await db.insert(subsection).values(subsectionsInsertData);

await pool.end();
