ALTER TABLE "course" ADD COLUMN "created_at" timestamp with time zone DEFAULT now();--> statement-breakpoint
ALTER TABLE "course" ADD COLUMN "updated_at" timestamp with time zone DEFAULT now();