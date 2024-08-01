<script lang="ts">
  import { cn } from "$lib/utils/tailwindcss";
  import type { HTMLHeadingAttributes } from "bits-ui/dist/internal";

  /* eslint-disable @typescript-eslint/no-unused-vars */
  interface $$Props extends Partial<HTMLHeadingAttributes> {}

  let klass: string | undefined | null = "";

  export { klass as class };
</script>

<h2 class={cn("font-semibold text-3xl", klass)} {...$$restProps}>
  <slot />
</h2>
