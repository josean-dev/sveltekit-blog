<script lang="ts">
  import RoundErrorIcon from "../svg/RoundErrorIcon.svelte";
  interface Props {
    children?: import('svelte').Snippet;
  }

  let { children }: Props = $props();
</script>

<div class="flex items-center space-x-1 text-red-500 font-bold py-2">
  <RoundErrorIcon class="size-5 fill-current" />
  <span>{@render children?.()}</span>
</div>
