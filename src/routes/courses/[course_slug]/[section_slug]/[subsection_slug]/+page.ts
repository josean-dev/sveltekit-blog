import type { CourseSubsectionMarkdown } from "../../../../../types";
import type { PageLoad } from "./$types";

export const load: PageLoad = async ({ data, params }) => {
  let markdown: CourseSubsectionMarkdown | undefined = undefined;
  try {
    markdown = await import(
      `../../../../../markdown/courses/${params.course_slug}/${params.section_slug}/${params.subsection_slug}.md`
    );
  } catch (err) {
    console.log("Subsection doesn't have a markdown file.");
  }

  return {
    subsection: data.subsection,
    markdown: markdown?.default
  };
};
