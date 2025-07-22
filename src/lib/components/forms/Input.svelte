<script lang="ts">
  import { createBubbler } from 'svelte/legacy';

  const bubble = createBubbler();
  import { cn } from "$lib/utils/tailwindcss";
  import type { HTMLInputAttributes } from "svelte/elements";

  /* eslint-disable @typescript-eslint/no-unused-vars */
  

  interface Props {
    value?: string;
    class?: string | undefined | null;
    [key: string]: any
  }

  let { value = $bindable(""), class: klass = "", ...rest }: Props = $props();

  
</script>

<input
  class={cn(
    "w-full rounded-md p-3 bg-transparent",
    "border dark:border-slate-400 focus:border-sky-500 dark:focus:border-sky-500",
    "focus:outline-0 focus:ring-1 focus:ring-sky-500",
    "disabled:bg-slate-200 disabled:placeholder-slate-400 disabled:border-slate-200",
    "dark:disabled:bg-slate-700 dark:disabled:placeholder-slate-500 dark:disabled:border-slate-700",
    klass
  )}
  bind:value
  oninput={bubble('input')}
  {...rest}
/>
