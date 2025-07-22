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
    color?: "primary" | "secondary" | "neutral";
    outline?: boolean;
    dashedOutline?: boolean;
  };
  type $$Events = ButtonEvents;


  


  interface Props {
    class?: string | undefined | null;
    color?: "primary" | "secondary" | "neutral";
    outline?: boolean;
    dashedOutline?: boolean;
    loading?: boolean;
    icon?: import('svelte').Snippet;
    children?: import('svelte').Snippet;
    [key: string]: any
  }

  let {
    class: klass = "",
    color = "primary",
    outline = false,
    dashedOutline = false,
    loading = false,
    icon,
    children,
    ...rest
  }: Props = $props();
</script>

<Button.Root
  class={cn({
    "relative block": true,
    "px-3 py-2 text-white rounded-md": true,
    "font-medium": true,
    "disabled:bg-slate-200 disabled:text-slate-400": true,
    "dark:disabled:bg-slate-700 dark:disabled:text-slate-500": true,
    "hover:text-white": outline,
    "bg-sky-500 hover:bg-sky-600": color === "primary" && !outline,
    "border-2 border-sky-500 hover:bg-sky-500 text-sky-500":
      color === "primary" && outline,
    "bg-indigo-400 hover:bg-indigo-500":
      color === "secondary" && !outline,
    "border-2 border-indigo-400 hover:bg-indigo-400 text-indigo-400":
      color === "secondary" && outline,
    "bg-black hover:bg-slate-700 dark:bg-white dark:hover:bg-slate-300 text-white dark:text-black":
      color === "neutral" && !outline,
    "border-2 border-black hover:bg-black dark:border-white dark:hover:bg-white text-black hover:text-white dark:text-white dark:hover:text-black":
      color === "neutral" && outline,
    "border-dashed": dashedOutline,
    [`${klass}`]: true
  })}
  on:click
  on:keydown
  {...rest}
>
  <div
    class={cn({
      invisible: loading,
      "flex items-center justify-center space-x-2": true
    })}
  >
    {@render icon?.()}
    {@render children?.()}
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
