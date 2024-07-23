<script lang="ts">
  import { cn } from "$lib/utils/tailwindcss";

  /* eslint-disable @typescript-eslint/no-unused-vars */
  interface $$Props extends Partial<HTMLHeadingElement> {}

  let klass: string | undefined | null = "";

  export { klass as class };
</script>

<h1 class={cn("font-bold text-4xl", klass)} {...$$restProps}>
  <slot />
</h1>
