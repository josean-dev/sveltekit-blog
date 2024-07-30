<script lang="ts">
  import Input from "$lib/components/forms/Input.svelte";
  import FormContainer from "$lib/components/forms/FormContainer.svelte";
  import HeadingContainer from "$lib/components/headings/HeadingContainer.svelte";
  import H1 from "$lib/components/headings/H1.svelte";
  import FormSubmitButtonContainer from "$lib/components/forms/FormSubmitButtonContainer.svelte";
  import { superForm } from "sveltekit-superforms";
  import type { PageData } from "./$types";
  import FormPage from "$lib/components/forms/FormPage.svelte";
  import { addCourseFormSchema } from "./addCourseFormSchema";
  import { zodClient } from "sveltekit-superforms/adapters";
  import FormSubmitButton from "$lib/components/forms/FormSubmitButton.svelte";
  import FormError from "$lib/components/forms/FormError.svelte";
  import FormField from "$lib/components/forms/FormField.svelte";
  import FormControl from "$lib/components/forms/FormControl.svelte";

  export let data: PageData;

  const form = superForm(data.form, {
    validators: zodClient(addCourseFormSchema),
    validationMethod: "oninput"
  });

  const { form: formData, message, enhance, submitting } = form;
</script>

<FormPage>
  <HeadingContainer>
    <H1>Add New Course</H1>
  </HeadingContainer>

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
</FormPage>
