<script lang="ts">
  import CopyCodeInjector from "$lib/components/CopyCodeInjector.svelte";
  import type { PageData } from "./$types";

  export let data: PageData;

  const { subsection, markdown: Markdown } = data;
</script>

{#if subsection}
  <div style="padding:56.25% 0 0 0;position:relative;">
    <iframe
      src={`https://player.vimeo.com/video/${subsection.vimeoVideoId}?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479`}
      frameborder="0"
      allow="autoplay; fullscreen; picture-in-picture; clipboard-write"
      style="position:absolute;top:0;left:0;width:100%;height:100%;"
      title={subsection.name}
    />
  </div>

  {#if Markdown}
    <article
      class="prose max-w-none px-4 sm:px-8 py-8 dark:prose-invert md:prose-lg"
    >
      <CopyCodeInjector>
        <Markdown />
      </CopyCodeInjector>
    </article>
  {/if}
{/if}
