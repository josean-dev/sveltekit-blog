<script lang="ts">
  import ThinRightArrowIcon from "../svg/ThinRightArrowIcon.svelte";
  import HeadingLink from "./HeadingLink.svelte";

  interface Props {
    links: { href: string; label: string }[];
  }

  let { links }: Props = $props();
</script>

<div class="flex items-center text-slate-400 space-x-1">
  {#each links as { href, label }, i}
    <div class="flex items-center space-x-1">
      {#if i > 0}
        <div><ThinRightArrowIcon class="size-5 fill-current" /></div>
      {/if}
      <HeadingLink {href}>{label}</HeadingLink>
    </div>
  {/each}
</div>
