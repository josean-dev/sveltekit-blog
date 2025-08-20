<script lang="ts">
  import type { MarkdownPost } from "../../types";
  import { formatPublishedAt } from "$lib/utils/dates";

  export let metadata: MarkdownPost["metadata"];
</script>

<header class="p-4">
  <div class="mb-6 w-full sm:w-3/5 space-y-2">
    {#if metadata.youtubeId}
      {#each metadata.youtubeId.split(",") as youtubeId}
        <div
          class="aspect-h-9 aspect-w-16 overflow-hidden rounded-lg"
        >
          <iframe
            title={metadata.title}
            src={`https://www.youtube.com/embed/${youtubeId}?origin=http://example.com`}
            allow="fullscreen"
          />
        </div>
      {/each}
    {:else}
      <div class="aspect-h-9 aspect-w-16 overflow-hidden rounded-lg">
        <img
          src={metadata.imgUrl}
          alt={metadata.title}
          class="object-cover"
        />
      </div>
    {/if}
  </div>

  <div>
    <h1 class="mb-4 text-4xl font-bold">
      {metadata.title}
    </h1>

    <div class="inline-block border-t py-2 dark:border-gray-700">
      <span>Published: </span>
      <time class="font-light" datetime={metadata.publishedAt}>
        {formatPublishedAt(metadata.publishedAt)}
      </time>
    </div>
  </div>
</header>
