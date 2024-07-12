<script lang="ts">
  import { cn } from "$lib/utils/tailwindcss";
  import type { HTMLThAttributes } from "svelte/elements";

  /* eslint-disable @typescript-eslint/no-unused-vars */
  interface $$Props extends Partial<HTMLThAttributes> {}
</script>

<th
  {...$$restProps}
  class={cn(
    "px-6 py-4 font-bold border-b dark:border-gray-700 dark:text-gray-500 text-gray-500 text-sm uppercase",
    $$restProps.class
  )}
>
  <slot />
</th>
