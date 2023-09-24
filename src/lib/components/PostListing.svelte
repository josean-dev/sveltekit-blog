<script lang="ts">
  import type { MarkdownPostMetadataAndSlug } from "../../types";
  import { formatPublishedAt } from "$lib/utils/dates";

  export let post: MarkdownPostMetadataAndSlug;

  let href = `/posts/${post.slug}`;
  let youtubeHref = post.metadata.youtubeId ? `https://youtu.be/${post.metadata.youtubeId}` : "";
</script>

<article class="p-4 sm:flex sm:space-x-4">
  <a {href} class="block sm:w-80">
    <div class="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden">
      <img src={post.metadata.imgUrl} alt={post.metadata.title} class="object-cover" />
    </div>
  </a>

  <div class="flex-1 py-2 sm:py-0">
    <a {href}>
      <h3 class="text-xl font-medium mb-1">
        {post.metadata.title}
      </h3>
      <p class="font-light text-gray-60 dark:text-gray-300">
        <span>Published: </span>
        <time datetime={post.metadata.publishedAt}>
          {formatPublishedAt(post.metadata.publishedAt)}
        </time>
      </p>

      <p class="py-2 font-light">
        {post.metadata.summary}
      </p>
    </a>

    <div
      class="flex space-x-4 text-gray-600 dark:text-gray-300 font-light
          underline"
    >
      <a {href}>Read More</a>
      {#if post.metadata.youtubeId}
        <a href={youtubeHref}>Watch Video</a>
      {/if}
    </div>
  </div>
</article>
