<script lang="ts">
  interface Props {
    errorProps: Record<string, unknown>;
    errorMessage: string;
  }

  let { errorProps, errorMessage }: Props = $props();
</script>

<span class="text-red-500 mt-2" {...errorProps}>
  {errorMessage}
</span>
