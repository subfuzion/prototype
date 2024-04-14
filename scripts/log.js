#!/usr/bin/env node

import Cmd from './lib/nanocli.js';

const description =
    `Record and review important changes to the project. Changes are recorded in
[REPO]/docs/changelog.md

- If you run the command with no argument, the changelog is printed to stdout.

- If you run the command with a message argument, the message will be appended
  to the bottom of the changelog with a timestamp.
`;

Cmd()
    .version("1.0.0")
    .description(description)
    .run();
