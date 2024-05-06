ALTER TABLE "section" ALTER COLUMN "title" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "subsection" ALTER COLUMN "title" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "course" ADD COLUMN "slug" text;--> statement-breakpoint
ALTER TABLE "section" ADD COLUMN "slug" text;--> statement-breakpoint
ALTER TABLE "subsection" ADD COLUMN "slug" text;