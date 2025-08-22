<script lang="ts">
  import type { SelectCourse } from "$lib/server/db/schema";
  import { formatPublishedAt } from "$lib/utils/dates";

  interface Props {
    course: SelectCourse & { sectionsCount: number };
  }

  let { course }: Props = $props();

  const href = `/courses/${course.slug}`;
</script>

<article class="p-4 sm:flex sm:space-x-4">
  <div class="flex-1 py-2 sm:py-0">
    <a {href}>
      <h3 class="mb-1 text-xl font-medium">
        {course.name}
      </h3>
      <p class="text-gray-60 font-light dark:text-gray-300">
        <span>Created: </span>
        <time datetime={course.createdAt.toISOString()}>
          {formatPublishedAt(course.createdAt.toISOString())}
        </time>
      </p>

      <p class="py-2 font-light">
        {course.sectionsCount} section{course.sectionsCount !== 1
          ? "s"
          : ""}
      </p>
    </a>

    <div
      class="flex space-x-4 font-light text-gray-600 underline
          dark:text-gray-300"
    >
      <a {href}>View Course</a>
    </div>
  </div>
</article>
