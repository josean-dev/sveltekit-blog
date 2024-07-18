<script>
  import RoundErrorIcon from "../svg/RoundErrorIcon.svelte";
</script>

<div class="flex items-center space-x-1 text-red-500 font-bold py-2">
  <RoundErrorIcon class="size-5 fill-current" />
  <span><slot /></span>
</div>
