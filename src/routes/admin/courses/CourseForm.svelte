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
  import EntityDetailPageSaveButton from "./EntityDetailPageSaveButton.svelte";
  import { isDataChanged } from "$lib/utils/forms";
  import FormSubmitButtonContainer from "$lib/components/forms/FormSubmitButtonContainer.svelte";
  import BasicButton from "$lib/components/BasicButton.svelte";
  import FormInput from "$lib/components/forms/FormInput.svelte";

  interface Props {
    courseForm: SuperValidated<Infer<CourseFormSchema>>;
    edit?: boolean;
    formId?: string;
  }

  let {
    courseForm,
    edit = false,
    formId = "courseForm"
  }: Props = $props();

  const form = superForm(courseForm, {
    validators: zodClient(courseFormSchema),
    validationMethod: "oninput",
    resetForm: false
  });

  const { form: formData, message, enhance, submitting } = form;

  let dataChanged = $derived(
    isDataChanged($formData, courseForm.data)
  );
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
