<script lang="ts">
  import Button from "$lib/components/Button.svelte";
  import H2 from "$lib/components/headings/H2.svelte";
  import HeadingContainer from "$lib/components/headings/HeadingContainer.svelte";

  export let courseId: number;
</script>

<div class="px-4">
  <HeadingContainer underline>
    <H2>Sections</H2>
  </HeadingContainer>

  <ul class="dark:text-gray-300">
    <slot />
  </ul>

  <div class="py-4">
    <Button
      slot="button"
      href="/admin/courses/{courseId}/sections/add"
      outline
      color="primary"
    >
      + Add Section
    </Button>
  </div>
</div>
