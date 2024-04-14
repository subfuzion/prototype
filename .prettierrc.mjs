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
      // https://prettier.io/docs/en/configuration.html#editorconfig
      editorconfig: true,
      files: [".gitignore"],
    },
    {
      files: "*.astro",
      options: { parser: "astro" },
    },
  ],
};

export default config;
