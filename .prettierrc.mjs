/** @type {import("prettier").Config} */
const config = {
  arrowParens: "always",
  bracketSpacing: true,
  semi: true,
  singleQuote: false,
  trailingComma: "es5",

  plugins: ["prettier-plugin-astro"],

  overrides: [
    {
      editorconfig: true,
      files: [".editorconfig", ".eslintignore"],
      options: { parser: "json" },
    },
    {
      files: "*.astro",
      options: { parser: "astro" },
    },
  ],
};

export default config;
