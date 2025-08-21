<script lang="ts">
  import H1 from "$lib/components/headings/H1.svelte";
  import HeadingContainer from "$lib/components/headings/HeadingContainer.svelte";
  import type { PageProps } from "./$types";
  import CourseForm from "../CourseForm.svelte";
  import AdminSubsectionListItem from "./AdminSubsectionListItem.svelte";
  import AdminSectionList from "./AdminSectionList.svelte";
  import AdminSectionListItem from "./AdminSectionListItem.svelte";

  let { data, form }: PageProps = $props();

  let { course, sections, courseForm } = $derived(data);
</script>

{#if course && sections}
  <HeadingContainer underline>
    <H1>{course.name}</H1>
  </HeadingContainer>

  <CourseForm
    edit
    deleteErrorMessage={form?.deleteError?.message}
    {courseForm}
  />

  <AdminSectionList courseId={course.id}>
    {#each sections as section}
      <AdminSectionListItem
        {section}
        numSubsections={section.subsections.length}
        courseId={course.id}
      >
        {#each section.subsections as subsection}
          <AdminSubsectionListItem
            courseId={course.id}
            sectionId={section.id}
            {subsection}
          />
        {/each}
      </AdminSectionListItem>
    {/each}
  </AdminSectionList>
{/if}
