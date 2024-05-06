ALTER TABLE "subsection" RENAME COLUMN "videoUrl" TO "vimeo_video_id";--> statement-breakpoint
ALTER TABLE "subsection" RENAME COLUMN "videoLength" TO "video_length";--> statement-breakpoint
ALTER TABLE "subsection" RENAME COLUMN "markdownFilePath" TO "markdown_file_path";--> statement-breakpoint
ALTER TABLE "subsection" ALTER COLUMN "vimeo_video_id" SET DATA TYPE varchar(9);