<script lang="ts">
  import type { PageData } from "./$types";

  export let data: PageData;
</script>

{#if data.subsection}
  <div style="padding:56.25% 0 0 0;position:relative;">
    <iframe
      src={`https://player.vimeo.com/video/${data.subsection.vimeoVideoId}?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479`}
      frameborder="0"
      allow="autoplay; fullscreen; picture-in-picture; clipboard-write"
      style="position:absolute;top:0;left:0;width:100%;height:100%;"
      title={data.subsection.name}
    />
  </div>
{/if}
