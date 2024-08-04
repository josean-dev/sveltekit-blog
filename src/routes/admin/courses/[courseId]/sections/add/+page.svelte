<script lang="ts">
  import type { PageData } from "./$types";
  import FormPage from "$lib/components/forms/FormPage.svelte";
  import HeadingContainer from "$lib/components/headings/HeadingContainer.svelte";
  import H1 from "$lib/components/headings/H1.svelte";
  import H2 from "$lib/components/headings/H2.svelte";
  import SectionForm from "../SectionForm.svelte";

  export let data: PageData;

  const { course } = data;
</script>

{#if course}
  <FormPage>
    <HeadingContainer underline>
      <H1>{course.name}</H1>
    </HeadingContainer>

    <HeadingContainer>
      <H2>Add New Section</H2>
    </HeadingContainer>

    <SectionForm sectionForm={data.form} courseId={course.id} />
  </FormPage>
{/if}
