<script lang="ts">
  import BasicButton from "$lib/components/BasicButton.svelte";
  import H2 from "$lib/components/headings/H2.svelte";
  import HeadingContainer from "$lib/components/headings/HeadingContainer.svelte";

  interface Props {
    courseId: number;
    children?: import("svelte").Snippet;
  }

  let { courseId, children }: Props = $props();
</script>

<div class="px-4">
  <HeadingContainer underline>
    <H2>Sections</H2>
  </HeadingContainer>

  <ul class="dark:text-gray-300">
    {@render children?.()}
  </ul>

  <div class="py-4">
    {#snippet button()}
      <BasicButton
        href="/admin/courses/{courseId}/sections/add"
        outline
        color="primary"
      >
        + Add Section
      </BasicButton>
    {/snippet}
  </div>
</div>
