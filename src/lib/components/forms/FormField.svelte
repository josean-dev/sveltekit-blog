<script lang="ts" context="module">
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  import type { FormPath } from "sveltekit-superforms";

  // the form object
  type T = Record<string, unknown>;
  // the path/name of the field in the form object
  type U = unknown;
</script>

<script
  lang="ts"
  generics="T extends Record<string, unknown>, U extends FormPath<T>"
>
  import FormInputContainer from "./FormInputContainer.svelte";

  import { Field, type FieldProps, FieldErrors } from "formsnap";
  import type { SuperForm } from "sveltekit-superforms";
  import FormFieldError from "./FormFieldError.svelte";

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  type $$Props = FieldProps<T, U>;

  export let form: SuperForm<T>;
  export let name: U;
</script>

<!-- passing the slot props down are optional -->
<Field {form} {name} let:value let:errors let:tainted let:constraints>
  <FormInputContainer>
    <slot {value} {errors} {tainted} {constraints} />
    <FieldErrors let:errors let:errorAttrs>
      {#if errors.length > 0}
        <FormFieldError errorMessage={errors[0]} {errorAttrs} />
      {/if}
    </FieldErrors>
  </FormInputContainer>
</Field>
