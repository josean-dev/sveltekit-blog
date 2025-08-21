<script lang="ts">
  import {
    superForm,
    type Infer,
    type SuperValidated
  } from "sveltekit-superforms";
  import {
    sectionFormSchema,
    type SectionFormSchema
  } from "./sectionFormSchema";
  import { zodClient } from "sveltekit-superforms/adapters";
  import FormContainer from "$lib/components/forms/FormContainer.svelte";
  import FormError from "$lib/components/forms/FormError.svelte";
  import FormField from "$lib/components/forms/FormField.svelte";
  import FormControl from "$lib/components/forms/FormControl.svelte";
  import FormSubmitButtonContainer from "$lib/components/forms/FormSubmitButtonContainer.svelte";
  import FormSubmitButton from "$lib/components/forms/FormSubmitButton.svelte";
  import EditEntityActionButtonsContainer from "../../EditEntityActionButtonsContainer.svelte";
  import { isDataChanged } from "$lib/utils/forms";
  import FormInput from "$lib/components/forms/FormInput.svelte";
  import { enhance } from "$app/forms";

  interface Props {
    sectionForm: SuperValidated<Infer<SectionFormSchema>>;
    edit?: boolean;
    deleteErrorMessage?: string;
  }

  let {
    sectionForm,
    edit = false,
    deleteErrorMessage
  }: Props = $props();

  const form = superForm(sectionForm, {
    validators: zodClient(sectionFormSchema),
    validationMethod: "oninput",
    resetForm: false
  });

  const {
    form: formData,
    message,
    enhance: formEnhance,
    submitting
  } = form;

  let dataChanged = $derived(
    isDataChanged($formData, sectionForm.data)
  );

  let deleting = $state(false);
</script>

{#if edit}
  <EditEntityActionButtonsContainer
    saveDisabled={!dataChanged}
    saving={$submitting}
    {deleting}
  />
{/if}

<form
  id="deleteForm"
  method="POST"
  action="?/delete"
  use:enhance={() => {
    deleting = true;
    return async ({ update }) => {
      await update();
      deleting = false;
    };
  }}
></form>

<FormContainer>
  {#if $message}
    <FormError>
      {$message}
    </FormError>
  {:else if deleteErrorMessage}
    <FormError>
      {deleteErrorMessage}
    </FormError>
  {/if}

  <form
    id="editAddForm"
    method="POST"
    action="?/submit"
    use:formEnhance
  >
    <FormField {form} name="name">
      <FormControl label="Name">
        {#snippet children({ props })}
          <FormInput
            type="text"
            placeholder="Enter the name of the section"
            bind:value={$formData.name}
            {...props}
          />
        {/snippet}
      </FormControl>
    </FormField>

    <FormField {form} name="slug">
      <FormControl label="Slug">
        {#snippet children({ props })}
          <FormInput
            type="text"
            placeholder="Enter a unique slug for the section"
            bind:value={$formData.slug}
            {...props}
          />
        {/snippet}
      </FormControl>
    </FormField>

    {#if !edit}
      <FormSubmitButtonContainer>
        <FormSubmitButton submitting={$submitting}>
          Create Section
        </FormSubmitButton>
      </FormSubmitButtonContainer>
    {/if}
  </form>
</FormContainer>
