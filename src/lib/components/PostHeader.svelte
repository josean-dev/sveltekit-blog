<script lang="ts">
  import type { MarkdownPost } from "../../types";
  import { formatPublishedAt } from "$lib/utils/dates";

  export let metadata: MarkdownPost["metadata"];
</script>

<header class="p-4">
  <div class="w-full sm:w-3/5 mb-6">
    <div
      class="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden"
    >
      {#if metadata.youtubeId}
        <iframe
          title={metadata.title}
          src={`https://www.youtube.com/embed/${metadata.youtubeId}?origin=http://example.com`}
          allow="fullscreen"
        />
      {:else}
        <img
          src={metadata.imgUrl}
          alt={metadata.title}
          class="object-cover"
        />
      {/if}
    </div>
  </div>

  <div>
    <h1 class="text-4xl font-bold mb-4">
      {metadata.title}
    </h1>

    <div
      class="py-2 border-t dark:border-gray-700 inline-block"
    >
      <span>Published: </span>
      <time
        class="font-light"
        datetime={metadata.publishedAt}
      >
        {formatPublishedAt(metadata.publishedAt)}
      </time>
    </div>
  </div>
</header>
