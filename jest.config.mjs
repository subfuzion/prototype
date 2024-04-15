/** @type {import('jest').Config} */
const config = {
  verbose:                false,
  silent:                 true,
  testPathIgnorePatterns: [
    "<rootDir>/\.astro/",
    "<rootDir>/\.git/",
    "<rootDir>/\.github/",
    "<rootDir>/\.husky/",
    "<rootDir>/\.idea/",
    "<rootDir>/\.vscode/",
    "<rootDir>/build/",
    "<rootDir>/dist/",
    "<rootDir>/scratch/",
    "<rootDir>/dist/",
  ],
};

export default config;
