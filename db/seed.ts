import "dotenv/config";
import { db, connection } from "./client";
import { faker } from "@faker-js/faker";
import {
  InsertCourse,
  InsertSection,
  InsertSubsection,
  course,
  section,
  subsection
} from "./schema";

const coursesInsertData: InsertCourse[] = [];

for (let i = 0; i < 5; i++) {
  coursesInsertData.push({
    id: i + 1,
    name: faker.word.sample()
  });
}

const sectionsInsertData: InsertSection[] = [];

let sectionId = 1;
coursesInsertData.forEach((course) => {
  for (let i = 0; i < 5; i++) {
    sectionsInsertData.push({
      id: sectionId,
      title: faker.word.sample(),
      courseId: course.id!
    });
    sectionId += 1;
  }
});

const subsectionsInsertData: InsertSubsection[] = [];

let subsectionId = 1;
sectionsInsertData.forEach((section) => {
  for (let i = 0; i < 5; i++) {
    subsectionsInsertData.push({
      id: subsectionId,
      title: faker.word.sample(),
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
