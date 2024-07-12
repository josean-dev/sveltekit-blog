<script lang="ts">
  import { cn } from "$lib/utils/tailwindcss";
  import type { HTMLTableAttributes } from "svelte/elements";

  /* eslint-disable @typescript-eslint/no-unused-vars */
  interface $$Props extends Partial<HTMLTableAttributes> {}
</script>

<div class="overflow-x-auto">
  <table
    {...$$restProps}
    class={cn("w-full text-left", $$restProps.class)}
  >
    <slot />
  </table>
</div>
