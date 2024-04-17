/**
 * Add any rules you want, but Prettier is mainly here because of the Astro
 * plugin. Code linting and style formatting support is handled by eslint and
 * @stylistic/eslint-plugin.
 *
 * Styles set here ought to be generally consistent with styles set in
 * eslint.config.mjs, but some things might make more sense specifically for
 * Astro layouts.
 */

/** @type {import("prettier").Config} */
export default {
    arrowParens:    "always",
    bracketSpacing: true,
    semi:           true,
    singleQuote:    false,
    trailingComma:  "es5",

    plugins: ["prettier-plugin-astro"],

    overrides: [
        {
            files: [".gitignore", "**/*.{js,jsx,cjs,mjs,ts,tsx}"],
        },
        {

            // Astro plugin handles markdown layouts under src.
            files:   ["src/**/*.astro", "src/**/*.md"],
            options: {parser: "astro"},
        },
    ],
};
