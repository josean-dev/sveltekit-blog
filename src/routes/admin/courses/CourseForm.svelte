<script lang="ts">
  import {
    type SuperValidated,
    type Infer,
    superForm
  } from "sveltekit-superforms";
  import {
    courseFormSchema,
    type CourseFormSchema
  } from "./courseFormSchema";
  import { zodClient } from "sveltekit-superforms/adapters";
  import FormContainer from "$lib/components/forms/FormContainer.svelte";
  import FormError from "$lib/components/forms/FormError.svelte";
  import FormField from "$lib/components/forms/FormField.svelte";
  import FormControl from "$lib/components/forms/FormControl.svelte";
  import EditEntityActionButtonsContainer from "./EditEntityActionButtonsContainer.svelte";
  import { isDataChanged } from "$lib/utils/forms";
  import FormSubmitButtonContainer from "$lib/components/forms/FormSubmitButtonContainer.svelte";
  import BasicButton from "$lib/components/BasicButton.svelte";
  import FormInput from "$lib/components/forms/FormInput.svelte";
  import { enhance } from "$app/forms";

  interface Props {
    courseForm: SuperValidated<Infer<CourseFormSchema>>;
    edit?: boolean;
    deleteErrorMessage?: string;
  }

  let {
    courseForm,
    edit = false,
    deleteErrorMessage
  }: Props = $props();

  const form = superForm(courseForm, {
    validators: zodClient(courseFormSchema),
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
    isDataChanged($formData, courseForm.data)
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
    action="?/submit"
    id="editAddForm"
    method="POST"
    use:formEnhance
  >
    <FormField {form} name="name">
      <FormControl label="Name">
        {#snippet children({ props })}
          <FormInput
            type="text"
            placeholder="Enter the name of the course"
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
            placeholder="Enter a unique slug for the course"
            bind:value={$formData.slug}
            {...props}
          />
        {/snippet}
      </FormControl>
    </FormField>

    {#if !edit}
      <FormSubmitButtonContainer>
        <BasicButton loading={$submitting}>Create Course</BasicButton>
      </FormSubmitButtonContainer>
    {/if}
  </form>
</FormContainer>
