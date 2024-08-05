<script lang="ts">
  import Button from "$lib/components/Button.svelte";
  import H3 from "$lib/components/headings/H3.svelte";
  import type { SelectSection } from "$lib/server/db/schema";
  import pluralize from "pluralize";

  export let section: Pick<SelectSection, "name" | "id">;
  export let numSubsections: number;
  export let courseId: number;
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
    <slot />
  </ul>
  <div class="py-4 border-b border-dashed dark:border-gray-700">
    <Button
      slot="button"
      href="/admin/courses/{courseId}/sections/{section.id}/subsections/add"
      outline
      color="secondary"
    >
      + Add Subsection
    </Button>
  </div>
</li>
