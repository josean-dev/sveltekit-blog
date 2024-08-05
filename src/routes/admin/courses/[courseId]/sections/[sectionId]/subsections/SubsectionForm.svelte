<script lang="ts">
  import {
    superForm,
    type Infer,
    type SuperValidated
  } from "sveltekit-superforms";
  import { zodClient } from "sveltekit-superforms/adapters";
  import FormContainer from "$lib/components/forms/FormContainer.svelte";
  import FormError from "$lib/components/forms/FormError.svelte";
  import FormField from "$lib/components/forms/FormField.svelte";
  import FormControl from "$lib/components/forms/FormControl.svelte";
  import Input from "$lib/components/forms/Input.svelte";
  import FormSubmitButtonContainer from "$lib/components/forms/FormSubmitButtonContainer.svelte";
  import FormSubmitButton from "$lib/components/forms/FormSubmitButton.svelte";
  import {
    subsectionFormSchema,
    type SubsectionFormSchema
  } from "./subsectionFormSchema";
  import EntityDetailPageSaveButton from "../../../../EntityDetailPageSaveButton.svelte";

  export let subsectionForm: SuperValidated<
    Infer<SubsectionFormSchema>
  >;
  export let edit: boolean = false;

  $: initialData = subsectionForm.data;

  const form = superForm(subsectionForm, {
    validators: zodClient(subsectionFormSchema),
    validationMethod: "oninput",
    resetForm: false
  });

  export let formId = "sectionForm";

  const { form: formData, message, enhance, submitting } = form;

  $: dataChanged =
    JSON.stringify($formData) !== JSON.stringify(initialData);
</script>

{#if edit}
  <EntityDetailPageSaveButton
    disabled={!dataChanged}
    {formId}
    saving={$submitting}
  />
{/if}

<FormContainer>
  {#if $message}
    <FormError>
      {$message}
    </FormError>
  {/if}

  <form id={formId} method="POST" use:enhance>
    <FormField {form} name="name">
      <FormControl label="Name" let:attrs>
        <Input
          type="text"
          placeholder="Enter the name of the subsection"
          bind:value={$formData.name}
          {...attrs}
        />
      </FormControl>
    </FormField>

    <FormField {form} name="slug">
      <FormControl label="Slug" let:attrs>
        <Input
          type="text"
          placeholder="Enter a unique slug for the subsection"
          bind:value={$formData.slug}
          {...attrs}
        />
      </FormControl>
    </FormField>

    <Input type="hidden" name="id" value={$formData.id} />

    {#if !edit}
      <FormSubmitButtonContainer>
        <FormSubmitButton submitting={$submitting}>
          Create Subsection
        </FormSubmitButton>
      </FormSubmitButtonContainer>
    {/if}
  </form>
</FormContainer>
