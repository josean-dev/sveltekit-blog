<script lang="ts">
  import "./prism-night-owl.css";
  import type { PageData } from "./$types";
  import CopyCodeInjector from "$lib/components/CopyCodeInjector.svelte";
  import PostHeader from "$lib/components/PostHeader.svelte";
  import { page } from "$app/stores";

  export let data: PageData;

  const { metadata, post: Post } = data;
</script>

<svelte:head>
  <title>{metadata.title}</title>
  <meta name="description" content={metadata.summary} />
  <meta property="og:title" content={metadata.title} />
  <meta property="og:type" content="article" />
  <meta property="og:description" content={metadata.summary} />
  <meta property="og:image" content={metadata.imgUrl} />
  <meta property="og:url" content={$page.url.href} />
  <meta name="twitter:card" content="summary_large_image" />
</svelte:head>

<article>
  <PostHeader {metadata} />

  <div class="prose dark:prose-invert py-4 px-4 max-w-none">
    <CopyCodeInjector>
      <Post />
    </CopyCodeInjector>
  </div>
</article>
