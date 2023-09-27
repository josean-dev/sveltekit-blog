<script lang="ts">
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
    property="og:description"
    content="Full-stack dev passionate about web dev, neovim, dev workflows, mechanical keyboards and sharing what I know."
  />
</svelte:head>

<HomeHeader />

<section class="pb-6">
  <header
    class="inline-block border-b dark:border-gray-700
    py-2 mx-4 mb-4"
  >
    <h2 class="text-3xl font-semibold">Blog Posts</h2>
  </header>

  <section class="divide-y dark:divide-gray-700">
    {#each data.posts as post}
      <PostListing {post} />
    {/each}
  </section>
</section>
