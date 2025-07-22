<script lang="ts">
  import HeadingContainer from "$lib/components/headings/HeadingContainer.svelte";
  import H1 from "$lib/components/headings/H1.svelte";
  import type { PageData } from "./$types";
  import FormPage from "$lib/components/forms/FormPage.svelte";
  import CourseForm from "../CourseForm.svelte";

  interface Props {
    data: PageData;
  }

  let { data }: Props = $props();
</script>

<FormPage>
  <HeadingContainer>
    <H1>Add New Course</H1>
  </HeadingContainer>

  <CourseForm courseForm={data.form} />
</FormPage>
