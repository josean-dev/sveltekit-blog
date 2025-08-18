<script lang="ts">
  import type { Snippet } from "svelte";

  interface Props {
    href: string;
    children: Snippet;
  }

  let { href, children }: Props = $props();
</script>

<a {href} class="block font-light text-slate-400">
  {@render children?.()}
</a>
