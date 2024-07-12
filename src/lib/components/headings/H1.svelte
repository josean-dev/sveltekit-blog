<script lang="ts">
  import { cn } from "$lib/utils/tailwindcss";

  /* eslint-disable @typescript-eslint/no-unused-vars */
  interface $$Props extends Partial<HTMLHeadingElement> {}
</script>

<h1
  {...$$restProps}
  class={cn("font-bold text-4xl", $$restProps.class)}
>
  <slot />
</h1>
