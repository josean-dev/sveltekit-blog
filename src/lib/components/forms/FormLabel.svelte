<script lang="ts">
  import { cn } from "$lib/utils/tailwindcss";
  import type { HTMLLabelAttributes } from "svelte/elements";
  interface Props {
    children?: import('svelte').Snippet;
    [key: string]: any
  }

  let { children, ...rest }: Props = $props();

  /* eslint-disable @typescript-eslint/no-unused-vars */
  
</script>

<label {...rest} class={cn("mb-2 block", rest.class)}>
  {@render children?.()}
</label>
