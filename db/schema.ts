import { relations } from "drizzle-orm";
import { integer, pgTable, serial, text } from "drizzle-orm/pg-core";

export const course = pgTable("course", {
  id: serial("id").primaryKey(),
  name: text("name")
});

export type SelectCourse = typeof course.$inferSelect;
export type InsertCourse = typeof course.$inferInsert;

export const courseRelations = relations(course, ({ many }) => ({
  sections: many(section)
}));

export const section = pgTable("section", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  courseId: integer("course_id")
    .references(() => course.id, { onDelete: "cascade" })
    .notNull()
});

export type SelectSection = typeof section.$inferSelect;
export type InsertSection = typeof section.$inferInsert;

export const sectionRelations = relations(
  section,
  ({ one, many }) => ({
    course: one(course, {
      fields: [section.courseId],
      references: [course.id]
    }),
    subsections: many(subsection)
  })
);

export const subsection = pgTable("subsection", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  videoUrl: text("videoUrl"),
  videoLength: integer("videoLength"),
  markdownFilePath: text("markdownFilePath"),
  sectionId: integer("section_id")
    .references(() => section.id, { onDelete: "cascade" })
    .notNull()
});

export type SelectSubsection = typeof subsection.$inferSelect;
export type InsertSubsection = typeof subsection.$inferInsert;

export const subsectionRelations = relations(
  subsection,
  ({ one }) => ({
    section: one(section, {
      fields: [subsection.sectionId],
      references: [section.id]
    })
  })
);
