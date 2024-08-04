<script lang="ts">
  import Button from "$lib/components/Button.svelte";

  export let disabled: boolean = false;
  export let formId: string;
  export let saving: boolean = false;
</script>

<div class="flex w-full justify-end p-3">
  <Button {disabled} form={formId} loading={saving}
    >Save Changes</Button
  >
</div>
