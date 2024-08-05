<script lang="ts">
  import H1 from "$lib/components/headings/H1.svelte";
  import HeadingContainer from "$lib/components/headings/HeadingContainer.svelte";
  import type { PageData } from "./$types";
  import CourseForm from "../CourseForm.svelte";
  import AdminSubsectionListItem from "./AdminSubsectionListItem.svelte";
  import AdminSectionList from "./AdminSectionList.svelte";
  import AdminSectionListItem from "./AdminSectionListItem.svelte";

  export let data: PageData;

  $: ({ course, sections, form } = data);

  $: if (course) {
    form.data = course;
  }

  $: console.log(sections);
</script>

{#if course && sections}
  <HeadingContainer underline>
    <H1>{course.name}</H1>
  </HeadingContainer>

  <CourseForm edit courseForm={form} />

  <AdminSectionList courseId={course.id}>
    {#each sections as section}
      <AdminSectionListItem
        {section}
        numSubsections={section.subsections.length}
        courseId={course.id}
      >
        {#each section.subsections as subsection}
          <AdminSubsectionListItem {subsection} />
        {/each}
      </AdminSectionListItem>
    {/each}
  </AdminSectionList>
{/if}
