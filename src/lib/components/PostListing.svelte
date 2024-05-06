<script lang="ts">
  import type { MarkdownPostMetadataAndSlug } from "../../types";
  import { formatPublishedAt } from "$lib/utils/dates";

  export let post: MarkdownPostMetadataAndSlug;

  const href = `/posts/${post.slug}`;
  const youtubeHref = post.metadata.youtubeId
    ? `https://youtu.be/${post.metadata.youtubeId}`
    : "";
</script>

<article class="p-4 sm:flex sm:space-x-4">
  <a {href} class="block sm:w-80">
    <div class="aspect-h-9 aspect-w-16 overflow-hidden rounded-lg">
      <img
        src={post.metadata.imgUrl}
        alt={post.metadata.title}
        class="object-cover"
      />
    </div>
  </a>

  <div class="flex-1 py-2 sm:py-0">
    <a {href}>
      <h3 class="mb-1 text-xl font-medium">
        {post.metadata.title}
      </h3>
      <p class="text-gray-60 font-light dark:text-gray-300">
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
      class="flex space-x-4 font-light text-gray-600 underline
          dark:text-gray-300"
    >
      <a {href}>Read More</a>
      {#if post.metadata.youtubeId}
        <a href={youtubeHref}>Watch Video</a>
      {/if}
    </div>
  </div>
</article>
