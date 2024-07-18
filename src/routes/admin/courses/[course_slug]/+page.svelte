<script lang="ts">
  import H1 from "$lib/components/headings/H1.svelte";
  import HeadingContainer from "$lib/components/headings/HeadingContainer.svelte";
  import type { PageData } from "./$types";

  export let data: PageData;

  const { course } = data;
</script>

{#if course}
  <HeadingContainer>
    <H1>{course.name}</H1>
  </HeadingContainer>
{/if}
