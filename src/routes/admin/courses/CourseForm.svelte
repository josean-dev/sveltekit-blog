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
  import Input from "$lib/components/forms/Input.svelte";
  import FormSubmitButtonContainer from "$lib/components/forms/FormSubmitButtonContainer.svelte";
  import FormSubmitButton from "$lib/components/forms/FormSubmitButton.svelte";

  export let courseForm: SuperValidated<Infer<CourseFormSchema>>;

  const form = superForm(courseForm, {
    validators: zodClient(courseFormSchema),
    validationMethod: "oninput"
  });

  const { form: formData, message, enhance, submitting } = form;
</script>

<FormContainer>
  {#if $message}
    <FormError>
      {$message}
    </FormError>
  {/if}
  <form method="POST" use:enhance>
    <FormField {form} name="name">
      <FormControl label="Name" let:attrs>
        <Input
          type="text"
          placeholder="Enter the name of the course"
          bind:value={$formData.name}
          {...attrs}
        />
      </FormControl>
    </FormField>

    <FormField {form} name="slug">
      <FormControl label="Slug" let:attrs>
        <Input
          type="text"
          placeholder="Enter a unique slug for the course"
          bind:value={$formData.slug}
          {...attrs}
        />
      </FormControl>
    </FormField>

    <FormSubmitButtonContainer>
      <FormSubmitButton submitting={$submitting}>
        Create Course
      </FormSubmitButton>
    </FormSubmitButtonContainer>
  </form>
</FormContainer>
