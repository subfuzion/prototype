# Changelog

> [!NOTE]
>
> This changelog doesn't document new version releases. It's not a substitute
> for git log either, but it's a convenient record of important changes to the
> project structure, configuration, and tooling.

1. Ran `npm create astro@latest` and selected JavaScript
1. Add jest + types + config for test support
1. Add unified edtitorconfig and prettier support
1. Update `.npmrc` to ensure exact dep versions are pinned by default
1. Add @stylistically/esling-plun and configured it extensively; prettier is
   only used now for non-code files and for Astro layouts
1. Add a git pre-commit hook ([husky](https://typicode.github.io/husky/)) to
   lint, format, and run tests
1. Improve package.json scripts
1. Add `npm.sh` as a convenience script that can be sourced into bash
