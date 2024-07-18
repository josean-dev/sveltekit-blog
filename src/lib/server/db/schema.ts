import { relations, sql } from "drizzle-orm";
import {
  integer,
  pgTable,
  serial,
  text,
  timestamp,
  varchar
} from "drizzle-orm/pg-core";

export const course = pgTable("course", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").unique().notNull(),
  createdAt: timestamp("created_at", {
    withTimezone: true
  })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updated_at", {
    withTimezone: true
  })
    .defaultNow()
    .$onUpdate(() => sql`now()`)
    .notNull()
});

export type SelectCourse = typeof course.$inferSelect;
export type InsertCourse = typeof course.$inferInsert;

export const courseRelations = relations(course, ({ many }) => ({
  sections: many(section)
}));

export const section = pgTable("section", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").unique().notNull(),
  courseId: integer("course_id")
    .references(() => course.id, { onDelete: "cascade" })
    .notNull(),
  createdAt: timestamp("created_at", {
    withTimezone: true
  })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updated_at", {
    withTimezone: true
  })
    .defaultNow()
    .$onUpdate(() => sql`now()`)
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
  name: text("name").notNull(),
  slug: text("slug").unique().notNull(),
  vimeoVideoId: varchar("vimeo_video_id", { length: 9 }),
  videoLength: integer("video_length"),
  markdownFilePath: text("markdown_file_path"),
  sectionId: integer("section_id")
    .references(() => section.id, { onDelete: "cascade" })
    .notNull(),
  createdAt: timestamp("created_at", {
    withTimezone: true
  })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updated_at", {
    withTimezone: true
  })
    .defaultNow()
    .$onUpdate(() => sql`now()`)
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
