<script lang="ts">
  import "./prism-night-owl.css";
  import type { PageData } from "./$types";
  import CopyCodeInjector from "$lib/components/CopyCodeInjector.svelte";
  import PostHeader from "$lib/components/PostHeader.svelte";

  export let data: PageData;

  const { metadata, post: Post } = data;
</script>

<article>
  <PostHeader {metadata} />

  <div class="prose dark:prose-invert py-4 px-4 max-w-none">
    <CopyCodeInjector>
      <Post />
    </CopyCodeInjector>
  </div>
</article>
