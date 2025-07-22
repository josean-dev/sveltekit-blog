<script lang="ts">
  import { cn } from "$lib/utils/tailwindcss";

  /* eslint-disable @typescript-eslint/no-unused-vars */
  

  interface Props {
    underline?: boolean;
    children?: import('svelte').Snippet;
    button?: import('svelte').Snippet;
    [key: string]: any
  }

  let { underline = false, children, button, ...rest }: Props = $props();
</script>

<div
  {...rest}
  class={cn({
    "p-4 flex items-center justify-between": true,
    "border-b dark:border-gray-700": underline,
    [rest.class]: true
  })}
>
  <div>
    {@render children?.()}
  </div>
  {@render button?.()}
</div>
