<script lang="ts">
  import BasicButton from "$lib/components/BasicButton.svelte";
  import H2 from "$lib/components/headings/H2.svelte";
  import HeadingContainer from "$lib/components/headings/HeadingContainer.svelte";

  interface Props {
    courseId: number;
    sectionId: number;
    children?: import("svelte").Snippet;
  }

  let { courseId, sectionId, children }: Props = $props();
</script>

<div class="px-4">
  <HeadingContainer underline>
    <H2>Subsections</H2>
  </HeadingContainer>

  <ul class="px-4 dark:text-gray-300 py-2 space-y-2">
    {@render children?.()}
  </ul>

  <div class="py-4 px-4">
    <BasicButton
      href="/admin/courses/{courseId}/sections/{sectionId}/subsections/add"
      outline
      color="secondary"
    >
      + Add Subsection
    </BasicButton>
  </div>
</div>
