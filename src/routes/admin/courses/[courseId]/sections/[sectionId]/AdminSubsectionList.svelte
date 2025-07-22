<script lang="ts">
  import Button from "$lib/components/Button.svelte";
  import H2 from "$lib/components/headings/H2.svelte";
  import HeadingContainer from "$lib/components/headings/HeadingContainer.svelte";

  interface Props {
    courseId: number;
    sectionId: number;
    children?: import('svelte').Snippet;
  }

  let { courseId, sectionId, children }: Props = $props();
</script>

<div class="px-4">
  <HeadingContainer underline>
    <H2>Subsections</H2>
  </HeadingContainer>

  <ul class="dark:text-gray-300">
    {@render children?.()}
  </ul>

  <div class="py-4">
    {#snippet button()}
        <Button
        
        href="/admin/courses/{courseId}/sections/{sectionId}/subsections/add"
        outline
        color="secondary"
      >
        + Add Section
      </Button>
      {/snippet}
  </div>
</div>
