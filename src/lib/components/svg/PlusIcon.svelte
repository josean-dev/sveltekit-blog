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
    d="M20,11h-7V4c0-0.552-0.448-1-1-1s-1,0.448-1,1v7H4c-0.552,0-1,0.448-1,1s0.448,1,1,1h7v7c0,0.552,0.448,1,1,1s1-0.448,1-1 v-7h7c0.552,0,1-0.448,1-1S20.552,11,20,11z"
  />
</svg>
