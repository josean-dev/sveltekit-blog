<script lang="ts">
  import Button from "$lib/components/Button.svelte";
  import H2 from "$lib/components/headings/H2.svelte";
  import HeadingContainer from "$lib/components/headings/HeadingContainer.svelte";

  export let courseId: number;
  export let sectionId: number;
</script>

<div class="px-4">
  <HeadingContainer underline>
    <H2>Subsections</H2>
  </HeadingContainer>

  <ul class="dark:text-gray-300">
    <slot />
  </ul>

  <div class="py-4">
    <Button
      slot="button"
      href="/admin/courses/{courseId}/sections/{sectionId}/subsections/add"
      outline
      color="secondary"
    >
      + Add Section
    </Button>
  </div>
</div>
