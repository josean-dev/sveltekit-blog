<script lang="ts">
  import { run } from 'svelte/legacy';

  import H1 from "$lib/components/headings/H1.svelte";
  import HeadingContainer from "$lib/components/headings/HeadingContainer.svelte";
  import type { PageData } from "./$types";
  import CourseForm from "../CourseForm.svelte";
  import AdminSubsectionListItem from "./AdminSubsectionListItem.svelte";
  import AdminSectionList from "./AdminSectionList.svelte";
  import AdminSectionListItem from "./AdminSectionListItem.svelte";

  interface Props {
    data: PageData;
  }

  let { data }: Props = $props();

  let { course, sections, form } = $derived(data);

  run(() => {
    if (course) {
      form.data = course;
    }
  });

  run(() => {
    console.log(sections);
  });
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
