<script lang="ts">
  interface Props {
    class?: string;
  }

  let { class: klass = "" }: Props = $props();

  
</script>

<svg
  class={klass}
  xmlns="http://www.w3.org/2000/svg"
  x="0px"
  y="0px"
  viewBox="0 0 24 24"
>
  <path
    d="M12,2C6.477,2,2,6.477,2,12c0,5.523,4.477,10,10,10s10-4.477,10-10C22,6.477,17.523,2,12,2z M13,17h-2v-2h2V17z M13,13h-2 V7h2V13z"
  />
</svg>
