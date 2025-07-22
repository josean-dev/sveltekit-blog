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

<h1 class={cn("font-bold text-4xl", klass)} {...rest}>
  {@render children?.()}
</h1>
