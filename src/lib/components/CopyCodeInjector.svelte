<script lang="ts">
  import { onMount } from "svelte";
  import CopyCodeButton from "./CopyCodeButton.svelte";

  onMount(() => {
    const preTags: HTMLCollectionOf<HTMLPreElement> =
      document.getElementsByTagName("pre");

    for (let preTag of preTags) {
      const classList = Array.from(preTag.classList);

      const isCodeBlock = classList.some((className) =>
        className.startsWith("shiki")
      );

      if (isCodeBlock) {
        const preTagParent = preTag.parentNode;

        const newCodeBlockWrapper = document.createElement("div");
        newCodeBlockWrapper.className = `relative`;

        new CopyCodeButton({
          target: newCodeBlockWrapper
        });

        preTag.className = `not-prose p-4 rounded-lg text-base leading-7`;

        if (preTagParent) {
          preTagParent.replaceChild(newCodeBlockWrapper, preTag);
          newCodeBlockWrapper.appendChild(preTag);
        }
      }
    }
  });
</script>

<slot />
