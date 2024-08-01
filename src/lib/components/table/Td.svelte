<script lang="ts">
  import { cn } from "$lib/utils/tailwindcss";
  import type { HTMLTdAttributes } from "svelte/elements";

  /* eslint-disable @typescript-eslint/no-unused-vars */
  interface $$Props extends Partial<HTMLTdAttributes> {
    href?: string;
  }

  export let href: string = "";

  let klass: string | undefined | null = "";

  export { klass as class };
</script>

<td
  class={cn({
    "dark:text-gray-300 text-gray-800": true,
    "border-b dark:border-gray-700": true,
    "px-6 py-4": !href,
    [klass || ""]: true
  })}
  {...$$restProps}
>
  {#if href}
    <a
      {href}
      class={cn({
        block: true,
        "px-6 py-4": true
      })}
    >
      <slot />
    </a>
  {:else}
    <slot />
  {/if}
</td>
