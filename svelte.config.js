import adapter from "@sveltejs/adapter-auto";
import { vitePreprocess } from "@sveltejs/kit/vite";
import { escapeSvelte, mdsvex } from "mdsvex";
import shiki from "shiki";
import { loadTheme } from "shiki-themes";

async function codeHighlighter(code, langStr) {
  let lang = undefined;
  const lineOptions = [];

  if (langStr) {
    const langArr = langStr?.split("{");

    lang = langArr[0];

    let lineNumbersStr = langArr[1];

    if (lineNumbersStr) {
      lineNumbersStr = lineNumbersStr.substring(
        0,
        lineNumbersStr.length - 1
      );

      const lineNumberRanges = lineNumbersStr.split(",");

      const lineOptionClasses = ["line-highlight"];

      lineNumberRanges.forEach((lineNumberRange) => {
        const numbers = lineNumberRange.split("-");

        const startNum = parseInt(numbers[0]);

        lineOptions.push({
          line: startNum,
          classes: lineOptionClasses
        });

        if (numbers.length > 1) {
          const endNum = parseInt(numbers[1]);

          for (let i = startNum + 1; i <= endNum; i++) {
            lineOptions.push({ line: i, classes: lineOptionClasses });
          }
        }
      });
    }
  }

  const tokyoNight = loadTheme("./themes/tokyo-night.json");

  const highlighter = await shiki.getHighlighter({
    theme: tokyoNight,
    langs: lang ? [lang] : undefined
  });
  const html = escapeSvelte(
    highlighter.codeToHtml(code, {
      lang,
      lineOptions
    })
  );
  return `{@html \`${html}\` }`;
}

/** @type {import('@sveltejs/kit').Config} */
const config = {
  extensions: [".svelte", ".md"],
  // Consult https://kit.svelte.dev/docs/integrations#preprocessors
  // for more information about preprocessors
  preprocess: [
    vitePreprocess(),
    mdsvex({
      extensions: [".md"],
      highlight: {
        highlighter: codeHighlighter
      }
    })
  ],

  kit: {
    // adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
    // If your environment is not supported or you settled on a specific environment, switch out the adapter.
    // See https://kit.svelte.dev/docs/adapters for more information about adapters.
    adapter: adapter()
  }
};

export default config;
