<script lang="ts">
  import Label from "$lib/components/forms/Label.svelte";
  import Input from "$lib/components/forms/Input.svelte";
  import FormInputContainer from "$lib/components/forms/FormInputContainer.svelte";
  import FormContainer from "$lib/components/forms/FormContainer.svelte";
  import HeadingContainer from "$lib/components/headings/HeadingContainer.svelte";
  import H1 from "$lib/components/headings/H1.svelte";
  import Form from "$lib/components/forms/Form.svelte";
  import Button from "$lib/components/Button.svelte";
  import FormSubmitButtonContainer from "$lib/components/forms/FormSubmitButtonContainer.svelte";

  let email: string;
</script>

<FormContainer>
  <HeadingContainer>
    <H1>Add New Course</H1>
  </HeadingContainer>

  <Form>
    <FormInputContainer>
      <Label for="name">Name</Label>
      <Input
        type="text"
        name="name"
        placeholder="Enter the name of the course"
        bind:value={email}
      />
    </FormInputContainer>
    <FormInputContainer>
      <Label for="slug">Slug</Label>
      <Input
        type="text"
        name="slug"
        placeholder="Enter a slug for the course url"
        bind:value={email}
      />
    </FormInputContainer>
    <FormSubmitButtonContainer>
      <Button class="w-full">Create Course</Button>
    </FormSubmitButtonContainer>
  </Form>
</FormContainer>
