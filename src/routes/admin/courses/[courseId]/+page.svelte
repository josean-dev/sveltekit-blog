<script lang="ts">
  import Button from "$lib/components/Button.svelte";
  import H1 from "$lib/components/headings/H1.svelte";
  import HeadingContainer from "$lib/components/headings/HeadingContainer.svelte";
  import pluralize from "pluralize";
  import type { PageData } from "./$types";
  import CourseForm from "../CourseForm.svelte";
  import H2 from "$lib/components/headings/H2.svelte";

  export let data: PageData;

  $: ({ course, sections, form } = data);
</script>

{#if course && sections}
  <HeadingContainer underline>
    <H1>{course.name}</H1>
  </HeadingContainer>

  <CourseForm edit courseForm={form} />

  <div class="px-4">
    <HeadingContainer underline>
      <H2>Sections</H2>
      <Button
        slot="button"
        href="/admin/courses/{course.id}/sections/add"
        color="purple">+ Add Section</Button
      >
    </HeadingContainer>
    <ul>
      {#each sections as section}
        <li
          class="flex justify-between p-4 border-b dark:border-gray-700 dark:text-gray-300"
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
    </ul>
  </div>
{/if}
