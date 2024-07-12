<script lang="ts">
  import { cn } from "$lib/utils/tailwindcss";
  import type { HTMLTdAttributes } from "svelte/elements";

  /* eslint-disable @typescript-eslint/no-unused-vars */
  interface $$Props extends Partial<HTMLTdAttributes> {}
</script>

<td
  {...$$restProps}
  class={cn(
    "px-6 py-4 dark:text-gray-300 text-gray-800 border-b dark:border-gray-700",
    $$restProps.class
  )}
>
  <slot />
</td>
