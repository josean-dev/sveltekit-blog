<script lang="ts">
  import { cn } from "$lib/utils/tailwindcss";

  /* eslint-disable @typescript-eslint/no-unused-vars */
  interface $$Props extends Partial<HTMLHeadingElement> {
    underline?: boolean;
  }

  export let underline = false;
</script>

<div
  {...$$restProps}
  class={cn({
    "p-4 flex items-center justify-between": true,
    "border-b dark:border-gray-700": underline,
    [$$restProps.class]: true
  })}
>
  <slot />
  <slot name="button" />
</div>
