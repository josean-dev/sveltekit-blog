<script lang="ts">
  import Button from "$lib/components/Button.svelte";
  import H1 from "$lib/components/headings/H1.svelte";
  import HeadingContainer from "$lib/components/headings/HeadingContainer.svelte";
  import pluralize from "pluralize";
  import type { PageData } from "./$types";

  export let data: PageData;

  const { course, sections } = data;
</script>

{#if course && sections}
  <HeadingContainer>
    <H1>{course.name}</H1>
  </HeadingContainer>

  <div class="px-4">
    <ul>
      {#each sections as section}
        <li
          class="flex justify-between py-4 border-b dark:border-gray-700 dark:text-gray-300"
        >
          <div>
            {section.name}
          </div>
          <div>
            {section.slug}
          </div>
          <div>
            {pluralize("sections", section.subsections.length, true)}
          </div>
        </li>
      {/each}
      <Button
        href="/admin/courses/{course.slug}/sections/add"
        class="w-full rounded-none">+ Add Section</Button
      >
    </ul>
  </div>
{/if}
