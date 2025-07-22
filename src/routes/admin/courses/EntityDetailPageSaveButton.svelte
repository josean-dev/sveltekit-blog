<script lang="ts">
  import Button from "$lib/components/Button.svelte";

  interface Props {
    disabled?: boolean;
    formId: string;
    saving?: boolean;
  }

  let { disabled = false, formId, saving = false }: Props = $props();
</script>

<div class="flex w-full justify-end p-3">
  <Button {disabled} form={formId} loading={saving}
    >Save Changes</Button
  >
</div>
