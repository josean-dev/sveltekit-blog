<script lang="ts">
  import H1 from "$lib/components/headings/H1.svelte";
  import HeadingContainer from "$lib/components/headings/HeadingContainer.svelte";
  import AdminSubsectionListItem from "../../AdminSubsectionListItem.svelte";
  import SectionForm from "../SectionForm.svelte";
  import type { PageData } from "./$types";
  import AdminSubsectionList from "./AdminSubsectionList.svelte";

  interface Props {
    data: PageData;
  }

  let { data }: Props = $props();

  let { course, section, subsections, form } = $derived(data);
</script>

{#if course && section}
  <HeadingContainer underline>
    <a
      href="/admin/courses/{course.id}"
      class="font-light text-slate-400 mb-2">{course.name}</a
    >
    <H1>{section.name}</H1>
  </HeadingContainer>

  <SectionForm edit sectionForm={form} />

  <AdminSubsectionList courseId={course.id} sectionId={section.id}>
    {#each subsections as subsection}
      <AdminSubsectionListItem {subsection} />
    {/each}
  </AdminSubsectionList>
{/if}
