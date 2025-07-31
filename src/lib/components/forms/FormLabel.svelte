<script lang="ts">
  import { cn } from "$lib/utils/tailwindcss";
  import { Label } from "formsnap";

  interface Props {
    children?: import("svelte").Snippet;
    class?: string;
  }

  let { children, class: klass }: Props = $props();
</script>

<Label class={cn("mb-2 block", klass)}>
  {@render children?.()}
</Label>
