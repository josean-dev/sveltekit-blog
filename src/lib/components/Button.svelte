<script lang="ts">
  import { cn } from "$lib/utils/tailwindcss";
  import {
    Button,
    type ButtonProps,
    type ButtonEvents
  } from "bits-ui";
  import LoadingSpinnerIcon from "./svg/LoadingSpinnerIcon.svelte";

  /* eslint-disable @typescript-eslint/no-unused-vars */
  type $$Props = ButtonProps & { loading?: boolean };
  type $$Events = ButtonEvents;

  export let loading = false;
</script>

<Button.Root
  {...$$restProps}
  class={cn(
    "relative",
    "px-3 py-2 bg-sky-500 hover:bg-sky-600 text-white rounded-md",
    "font-medium",
    $$restProps.class
  )}
  type="button"
  on:click
  on:keydown
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
