<script lang="ts">
  import H1 from "$lib/components/headings/H1.svelte";
  import HeadingContainer from "$lib/components/headings/HeadingContainer.svelte";
  import SectionForm from "../SectionForm.svelte";
  import type { PageData } from "./$types";

  export let data: PageData;

  $: ({ course, section, form } = data);

  $: if (course && section) {
    form.data = {
      courseId: course.id,
      ...section
    };
  }
</script>

{#if course && section}
  <HeadingContainer underline>
    <span class="font-light text-slate-400 mb-2">{course.name}</span>
    <H1>{section.name}</H1>
  </HeadingContainer>

  <SectionForm edit sectionForm={form} courseId={course.id} />
{/if}
