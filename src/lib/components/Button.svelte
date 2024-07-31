<script lang="ts">
  import { cn } from "$lib/utils/tailwindcss";
  import {
    Button,
    type ButtonProps,
    type ButtonEvents
  } from "bits-ui";
  import LoadingSpinnerIcon from "./svg/LoadingSpinnerIcon.svelte";

  /* eslint-disable @typescript-eslint/no-unused-vars */
  type $$Props = ButtonProps & {
    loading?: boolean;
    color?: "blue" | "purple";
  };
  type $$Events = ButtonEvents;

  let klass: string | undefined | null = "";

  export { klass as class };

  export let color: "blue" | "purple" = "blue";

  export let loading = false;
</script>

<Button.Root
  class={cn({
    "relative block": true,
    "px-3 py-2 text-white rounded-md": true,
    "font-medium": true,
    "disabled:bg-slate-200 disabled:text-slate-400": true,
    "dark:disabled:bg-slate-700 dark:disabled:text-slate-500": true,
    "bg-sky-500 hover:bg-sky-600": color === "blue",
    "bg-purple-500 hover:bg-purple-600": color === "purple",
    [`${klass}`]: true
  })}
  on:click
  on:keydown
  {...$$restProps}
>
  <div
    class={cn({
      invisible: loading,
      "flex items-center justify-center space-x-2": true
    })}
  >
    <slot name="icon" />
    <slot />
  </div>

  <div
    class={cn({
      "absolute inset-0 flex items-center justify-center": loading,
      hidden: !loading
    })}
  >
    <LoadingSpinnerIcon
      class="size-7 fill-current animate-spin-slower"
    />
  </div>
</Button.Root>
