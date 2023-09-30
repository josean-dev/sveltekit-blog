<script lang="ts">
  import { page } from "$app/stores";
  import HomeHeader from "$lib/components/HomeHeader.svelte";
  import PostListing from "$lib/components/PostListing.svelte";
  import type { PageData } from "./$types";

  export let data: PageData;
</script>

<svelte:head>
  <title>Josean Martinez</title>
  <meta
    name="description"
    content="Full-stack dev passionate about web dev, neovim, dev workflows, mechanical keyboards and sharing what I know."
  />
  <meta property="og:title" content="Josean Martinez" />
  <meta property="og:type" content="website" />
  <meta
    property="og:image"
    content="https://res.cloudinary.com/martinez-cloud/image/upload/v1691247140/josean-youtube-blog/vim-beginners-tutorial_u32v9a.jpg"
  />
  <meta property="og:url" content={$page.url.href} />
  <meta
    property="og:description"
    content="Full-stack dev passionate about web dev, neovim, dev workflows, mechanical keyboards and sharing what I know."
  />
</svelte:head>

<HomeHeader />

<section class="pb-6">
  <header
    class="mx-4 mb-4 inline-block
    border-b py-2 dark:border-gray-700"
  >
    <h2 class="text-3xl font-semibold">Blog Posts</h2>
  </header>

  <section class="divide-y dark:divide-gray-700">
    {#each data.posts as post}
      <PostListing {post} />
    {/each}
  </section>
</section>
