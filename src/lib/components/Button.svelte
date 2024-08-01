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
    color?: "primary" | "secondary";
    style?: "solid" | "outline";
  };
  type $$Events = ButtonEvents;

  let klass: string | undefined | null = "";

  export { klass as class };

  export let color: "primary" | "secondary" = "primary";
  export let style: "solid" | "outline" = "solid";

  export let loading = false;
</script>

<Button.Root
  class={cn({
    "relative block": true,
    "px-3 py-2 text-white rounded-md": true,
    "font-medium": true,
    "disabled:bg-slate-200 disabled:text-slate-400": true,
    "dark:disabled:bg-slate-700 dark:disabled:text-slate-500": true,
    "bg-sky-500 hover:bg-sky-600":
      color === "primary" && style === "solid",
    "bg-teal-500 hover:bg-teal-600":
      color === "secondary" && style === "solid",
    "border-2 border-sky-500 hover:bg-sky-500 text-sky-500":
      color === "primary" && style === "outline",
    "border-2 border-teal-500 hover:bg-teal-500 text-teal-500":
      color === "secondary" && style === "outline",
    "hover:text-white": style === "outline",
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
