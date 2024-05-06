import "dotenv/config";
import { db, connection } from "./client";
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

for (let i = 0; i < 5; i++) {
  const slug = faker.word.sample();
  coursesInsertData.push({
    id: i + 1,
    name: capitalize(slug),
    slug
  });
}

const sectionsInsertData: InsertSection[] = [];

let sectionId = 1;
coursesInsertData.forEach((course) => {
  for (let i = 0; i < 5; i++) {
    const slug = faker.word.sample();
    sectionsInsertData.push({
      id: sectionId,
      name: capitalize(slug),
      slug,
      courseId: course.id!
    });
    sectionId += 1;
  }
});

const subsectionsInsertData: InsertSubsection[] = [];

let subsectionId = 1;
sectionsInsertData.forEach((section) => {
  for (let i = 0; i < 5; i++) {
    const slug = faker.word.sample();
    subsectionsInsertData.push({
      id: subsectionId,
      name: capitalize(slug),
      slug,
      vimeoVideoId: "942798419",
      videoLength: 77,
      sectionId: section.id!
    });
    subsectionId += 1;
  }
});

await db.delete(course);
await db.insert(course).values(coursesInsertData);

await db.delete(section);
await db.insert(section).values(sectionsInsertData);

await db.delete(subsection);
await db.insert(subsection).values(subsectionsInsertData);

await connection.end();
