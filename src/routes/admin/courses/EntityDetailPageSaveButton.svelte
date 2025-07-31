<script lang="ts">
  import BasicButton from "$lib/components/BasicButton.svelte";

  interface Props {
    disabled?: boolean;
    formId: string;
    saving?: boolean;
  }

  let { disabled = false, formId, saving = false }: Props = $props();
</script>

<div class="flex w-full justify-end p-3">
  <BasicButton {disabled} form={formId} loading={saving}>
    Save Changes
  </BasicButton>
</div>
