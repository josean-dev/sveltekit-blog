<script lang="ts">
  import { page } from "$app/stores";
  import CourseListing from "./CourseListing.svelte";
  import type { PageData } from "./$types";

  interface Props {
    data: PageData;
  }

  let { data }: Props = $props();
</script>

<svelte:head>
  <title>Courses - Josean Martinez</title>
  <meta
    name="description"
    content="Browse all available courses on web development, neovim, dev workflows, and more."
  />
  <meta property="og:title" content="Courses - Josean Martinez" />
  <meta property="og:type" content="website" />
  <meta property="og:url" content={$page.url.href} />
  <meta
    property="og:description"
    content="Browse all available courses on web development, neovim, dev workflows, and more."
  />
</svelte:head>

<section class="pb-6">
  <header
    class="mx-4 mb-4 inline-block
    border-b py-2 dark:border-gray-700"
  >
    <h2 class="text-3xl font-semibold">Courses</h2>
  </header>

  <section class="divide-y dark:divide-gray-700">
    {#each data.courses as course}
      <CourseListing {course} />
    {/each}
  </section>

  {#if data.courses.length === 0}
    <p class="p-4 text-gray-600 dark:text-gray-300">
      No courses available yet. Check back soon!
    </p>
  {/if}
</section>
