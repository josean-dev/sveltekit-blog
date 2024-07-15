<script lang="ts">
  import { cn } from "$lib/utils/tailwindcss";
  import type { HTMLInputAttributes } from "svelte/elements";

  /* eslint-disable @typescript-eslint/no-unused-vars */
  interface $$Props extends Partial<HTMLInputAttributes> {}
</script>

<input
  {...$$restProps}
  class={cn(
    "w-full rounded-md p-3 bg-transparent",
    "border dark:border-slate-400 focus:border-sky-500 dark:focus:border-sky-500",
    "focus:outline-0 focus:ring-1 focus:ring-sky-500",
    "disabled:bg-slate-200 disabled:placeholder-slate-400 disabled:border-slate-200",
    "dark:disabled:bg-slate-700 dark:disabled:placeholder-slate-500 dark:disabled:border-slate-700",
    $$restProps.class
  )}
/>
