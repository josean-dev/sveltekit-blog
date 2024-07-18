ALTER TABLE "course" ADD CONSTRAINT "course_slug_unique" UNIQUE("slug");--> statement-breakpoint
ALTER TABLE "section" ADD CONSTRAINT "section_slug_unique" UNIQUE("slug");--> statement-breakpoint
ALTER TABLE "subsection" ADD CONSTRAINT "subsection_slug_unique" UNIQUE("slug");