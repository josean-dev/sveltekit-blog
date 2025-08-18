<script lang="ts">
  import H1 from "$lib/components/headings/H1.svelte";
  import HeadingContainer from "$lib/components/headings/HeadingContainer.svelte";
  import HeadingLinkList from "$lib/components/headings/HeadingLinkList.svelte";
  import SubsectionForm from "../SubsectionForm.svelte";
  import type { PageData } from "./$types";

  interface Props {
    data: PageData;
  }

  let { data }: Props = $props();

  let { section, course, subsection, form } = $derived(data);
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

    <SubsectionForm edit subsectionForm={form} />
  </div>
{/if}

