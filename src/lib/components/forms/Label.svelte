<script lang="ts">
  import { cn } from "$lib/utils/tailwindcss";
  import type { HTMLLabelAttributes } from "svelte/elements";

  /* eslint-disable @typescript-eslint/no-unused-vars */
  interface $$Props extends Partial<HTMLLabelAttributes> {}
</script>

<label {...$$restProps} class={cn("mb-2 block", $$restProps.class)}>
  <slot />
</label>
