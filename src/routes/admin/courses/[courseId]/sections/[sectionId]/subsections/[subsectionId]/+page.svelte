<script lang="ts">
  import H1 from "$lib/components/headings/H1.svelte";
  import HeadingContainer from "$lib/components/headings/HeadingContainer.svelte";
  import HeadingLinkList from "$lib/components/headings/HeadingLinkList.svelte";
  import SubsectionForm from "../SubsectionForm.svelte";
  import type { PageProps } from "./$types";

  let { data, form }: PageProps = $props();

  let { section, course, subsection, subsectionForm } =
    $derived(data);
</script>

{#if course && section && subsection}
  <div>
    <HeadingContainer underline>
      <HeadingLinkList
        links={[
          { href: `/admin/courses/${course.id}`, label: course.name },
          {
            href: `/admin/courses/${course.id}/sections/${section.id}`,
            label: section.name
          }
        ]}
      />

      <H1>{subsection.name}</H1>
    </HeadingContainer>

    <SubsectionForm
      edit
      {subsectionForm}
      deleteErrorMessage={form?.deleteError?.message}
    />
  </div>
{/if}
