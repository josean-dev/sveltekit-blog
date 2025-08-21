<script lang="ts">
  import H1 from "$lib/components/headings/H1.svelte";
  import HeadingContainer from "$lib/components/headings/HeadingContainer.svelte";
  import HeadingLink from "$lib/components/headings/HeadingLink.svelte";
  import AdminSubsectionListItem from "../../AdminSubsectionListItem.svelte";
  import SectionForm from "../SectionForm.svelte";
  import type { PageProps } from "./$types";
  import AdminSubsectionList from "./AdminSubsectionList.svelte";

  let { data, form }: PageProps = $props();

  let { course, section, subsections, sectionForm } = $derived(data);
</script>

{#if course && section}
  <HeadingContainer underline>
    <HeadingLink href="/admin/courses/{course.id}">
      {course.name}
    </HeadingLink>
    <H1>{section.name}</H1>
  </HeadingContainer>

  <SectionForm
    edit
    {sectionForm}
    deleteErrorMessage={form?.deleteError?.message}
  />

  <AdminSubsectionList courseId={course.id} sectionId={section.id}>
    {#each subsections as subsection}
      <AdminSubsectionListItem
        courseId={course.id}
        sectionId={section.id}
        {subsection}
      />
    {/each}
  </AdminSubsectionList>
{/if}
