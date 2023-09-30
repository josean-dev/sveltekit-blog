/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,svelte,ts}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "dark-background": "#011423",
      },
      typography(theme) {
        return {
          DEFAULT: {
            css: {
              "code::before": {
                content: "none" // don’t generate the pseudo-element
                //                content: '""', // this is an alternative: generate pseudo element using an empty string
              },
              "code::after": {
                content: "none"
              },
              code: {
                color: theme("colors.white"),
                backgroundColor: "#143652",
                borderRadius: theme("borderRadius.DEFAULT"),
                paddingLeft: theme("spacing.1"),
                paddingRight: theme("spacing.1"),
                paddingTop: theme("spacing.1"),
                paddingBottom: theme("spacing.1")
              }
            }
          }
        };
      }
    }
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/aspect-ratio")
  ]
};
