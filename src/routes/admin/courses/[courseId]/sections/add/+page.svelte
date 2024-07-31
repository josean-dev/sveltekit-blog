<script lang="ts">
  import { superForm } from "sveltekit-superforms";
  import type { PageData } from "./$types";
  import { zodClient } from "sveltekit-superforms/adapters";
  import { addSectionFormSchema } from "./addSectionFormSchema";
  import FormPage from "$lib/components/forms/FormPage.svelte";
  import HeadingContainer from "$lib/components/headings/HeadingContainer.svelte";
  import H1 from "$lib/components/headings/H1.svelte";
  import Input from "$lib/components/forms/Input.svelte";
  import FormSubmitButtonContainer from "$lib/components/forms/FormSubmitButtonContainer.svelte";
  import FormSubmitButton from "$lib/components/forms/FormSubmitButton.svelte";
  import FormContainer from "$lib/components/forms/FormContainer.svelte";
  import FormError from "$lib/components/forms/FormError.svelte";
  import H2 from "$lib/components/headings/H2.svelte";
  import FormField from "$lib/components/forms/FormField.svelte";
  import FormControl from "$lib/components/forms/FormControl.svelte";

  export let data: PageData;

  const { course } = data;

  const form = superForm(data.form, {
    validators: zodClient(addSectionFormSchema),
    validationMethod: "oninput"
  });

  const { form: formData, message, enhance, submitting } = form;
</script>

{#if course}
  <FormPage>
    <HeadingContainer underline>
      <H1>{course.name}</H1>
    </HeadingContainer>

    <HeadingContainer>
      <H2>Add New Section</H2>
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
              placeholder="Enter the name of the section"
              bind:value={$formData.name}
              {...attrs}
            />
          </FormControl>
        </FormField>

        <FormField {form} name="slug">
          <FormControl label="Slug" let:attrs>
            <Input
              type="text"
              placeholder="Enter a unique slug for the section"
              bind:value={$formData.slug}
              {...attrs}
            />
          </FormControl>
        </FormField>

        <Input type="hidden" name="courseId" value={course.id} />
        <Input type="hidden" name="courseSlug" value={course.slug} />

        <FormSubmitButtonContainer>
          <FormSubmitButton submitting={$submitting}>
            Create Section
          </FormSubmitButton>
        </FormSubmitButtonContainer>
      </form>
    </FormContainer>
  </FormPage>
{/if}
