export default [
  {
    files: ["**/*.{js,jsx,mjs,cjs,ts,tsx}"],
  },
  {
    /**
     * node_modules and .git are the only default ignore patterns.
     * See: https://eslint.org/docs/latest/use/configure/ignore#ignoring-files
     * The following ensures any dot-directory gets ignored.
     */
    ignores: [".*/", "build/", "coverage/", "dist/", "scratch/"],
  },
  {
    rules: {},
  },
];
