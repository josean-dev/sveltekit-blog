<script lang="ts">
  import type { PageData } from "./$types";
  import FormPage from "$lib/components/forms/FormPage.svelte";
  import HeadingContainer from "$lib/components/headings/HeadingContainer.svelte";
  import H1 from "$lib/components/headings/H1.svelte";
  import H2 from "$lib/components/headings/H2.svelte";
  import SubsectionForm from "../SubsectionForm.svelte";

  interface Props {
    data: PageData;
  }

  let { data }: Props = $props();

  const { course, section } = data;
</script>

{#if course && section}
  <FormPage>
    <HeadingContainer underline>
      <span class="font-light text-slate-400 mb-2">{course.name}</span
      >
      <H1>{section.name}</H1>
    </HeadingContainer>

    <HeadingContainer>
      <H2>Add New Subsection</H2>
    </HeadingContainer>

    <SubsectionForm subsectionForm={data.form} />
  </FormPage>
{/if}
