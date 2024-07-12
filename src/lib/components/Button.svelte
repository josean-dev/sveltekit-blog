<script lang="ts">
  import { cn } from "$lib/utils/tailwindcss";
  import {
    Button,
    type ButtonProps,
    type ButtonEvents
  } from "bits-ui";

  /* eslint-disable @typescript-eslint/no-unused-vars */
  type $$Props = ButtonProps;
  type $$Events = ButtonEvents;
</script>

<Button.Root
  {...$$restProps}
  class={cn(
    "px-3 py-2 bg-sky-500 hover:bg-sky-600 text-white rounded-md font-medium flex items-center space-x-2",
    $$restProps.class
  )}
  type="button"
  on:click
  on:keydown
>
  <slot name="icon" />
  <slot />
</Button.Root>
