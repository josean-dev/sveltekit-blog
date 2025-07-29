<script lang="ts">
  import { onMount, mount } from "svelte";
  import CopyCodeButton from "./CopyCodeButton.svelte";

  interface Props {
    children?: import("svelte").Snippet;
  }

  const { children }: Props = $props();

  onMount(() => {
    const preTags: HTMLCollectionOf<HTMLPreElement> =
      document.getElementsByTagName("pre");

    for (const preTag of preTags) {
      const classList = Array.from(preTag.classList);

      const isCodeBlock = classList.some((className) =>
        className.startsWith("shiki")
      );

      if (isCodeBlock) {
        const preTagParent = preTag.parentNode;

        const newCodeBlockWrapper = document.createElement("div");
        newCodeBlockWrapper.className = `relative`;

        mount(CopyCodeButton, {
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

{@render children?.()}
