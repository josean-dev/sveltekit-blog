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
    d="M12,2C6.477,2,2,6.477,2,12c0,5.523,4.477,10,10,10s10-4.477,10-10C22,6.477,17.523,2,12,2z M10,15.5v-7 c0-0.412,0.47-0.647,0.8-0.4l4.667,3.5c0.267,0.2,0.267,0.6,0,0.8L10.8,15.9C10.47,16.147,10,15.912,10,15.5z"
  />
</svg>
