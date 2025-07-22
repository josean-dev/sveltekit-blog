<script lang="ts">
  import { cn } from "$lib/utils/tailwindcss";
  import type { HTMLHeadingAttributes } from "bits-ui/dist/internal";

  /* eslint-disable @typescript-eslint/no-unused-vars */
  

  interface Props {
    class?: string | undefined | null;
    children?: import('svelte').Snippet;
    [key: string]: any
  }

  let { class: klass = "", children, ...rest }: Props = $props();

  
</script>

<h2 class={cn("font-semibold text-3xl", klass)} {...rest}>
  {@render children?.()}
</h2>
