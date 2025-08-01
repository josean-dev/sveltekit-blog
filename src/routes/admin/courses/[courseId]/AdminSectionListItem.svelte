<script lang="ts">
  import BasicButton from "$lib/components/BasicButton.svelte";
  import H3 from "$lib/components/headings/H3.svelte";
  import type { SelectSection } from "$lib/server/db/schema";
  import pluralize from "pluralize";

  interface Props {
    section: Pick<SelectSection, "name" | "id">;
    numSubsections: number;
    courseId: number;
    children?: import("svelte").Snippet;
  }

  let { section, numSubsections, courseId, children }: Props =
    $props();
</script>

<li class="dark:text-gray-300">
  <a
    href="/admin/courses/{courseId}/sections/{section.id}"
    class="block p-4 border-b border-dashed dark:border-gray-700"
  >
    <H3>
      {section.name}
    </H3>
    <p class="font-light">
      {pluralize("subsections", numSubsections, true)}
    </p>
  </a>
  <ul>
    {@render children?.()}
  </ul>
  <div class="py-4 border-b border-dashed dark:border-gray-700">
    <BasicButton
      href="/admin/courses/{courseId}/sections/{section.id}/subsections/add"
      outline
      color="secondary"
    >
      + Add Subsection
    </BasicButton>
  </div>
</li>
