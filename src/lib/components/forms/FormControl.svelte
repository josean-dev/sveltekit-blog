<script lang="ts">
  import { Control, Label, type ControlProps } from "formsnap";
  import FormLabel from "./FormLabel.svelte";

  /* eslint-disable @typescript-eslint/no-unused-vars */
  type $$Props = ControlProps & {
    label: string;
  };

  export let label: string;
</script>

<Control let:attrs {...$$restProps}>
  <div class="flex flex-col gap-2">
    <Label asChild let:labelAttrs>
      <FormLabel {...labelAttrs}>{label}</FormLabel>
    </Label>

    <slot {attrs} />
  </div>
</Control>
