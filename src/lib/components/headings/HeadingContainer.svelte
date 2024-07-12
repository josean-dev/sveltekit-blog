<script lang="ts">
  import { cn } from "$lib/utils/tailwindcss";

  /* eslint-disable @typescript-eslint/no-unused-vars */
  interface $$Props extends Partial<HTMLHeadingElement> {}
</script>

<div
  {...$$restProps}
  class={cn(
    "p-4 flex items-center justify-between",
    $$restProps.class
  )}
>
  <slot />
  <slot name="button" />
</div>
