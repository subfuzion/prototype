#!/usr/bin/env node

import {readFileSync, writeFileSync} from "node:fs";
import {argv, stdout, exit} from 'node:process';

import Cmd from './lib/nanocli.js';
import {processName} from './lib/utils.js';

const VERSION = "1.0";
const NAME = processName();

const args = argv.slice(2);


Cmd()
    .version("1.0.0")
    .run();


exit();

//
// function main(args) {
//   switch (getArg(0)) {
//     case "-h":
//     case "--help":
//       printUsageExit();
//       break;
//     case "-v":
//     case "--version":
//       printExit(VERSION);
//       break;
//   }
//
//   const src = getArg(0);
//   const dst = getArg(1);
//
//   let data;
//   if (!src) {
//     data = readFileSync(0, "utf-8");
//   } else {
//     data = readFileSync(src).toString();
//   }
//
//   if (data) {
//     const parsed = JSON.parse(data);
//
//     // dotenv format: https://www.npmjs.com/package/dotenv#what-rules-does-the-parsing-engine-follow
//
//     if (parsed.private_key) {
//       parsed.private_key = `"${parsed.private_key.replace(/\n/g, "\\n")}"`;
//     }
//
//     const props = Object.entries(parsed).map(([key, value]) => `FB_${key.toUpperCase()}=${value}`);
//     const text = props.join("\n");
//
//     if (!src) {
//       stdout.write(text);
//     } else {
//       writeFileSync(dst, text);
//     }
//   }
// }
//
// function getArg(index) {
//   return args && args.length > index ? args[index] : null;
// }
//
// function printUsageExit() {
//   const usage =
// `${NAME} ${VERSION}
//
// Usage:
//     ${NAME} [MESSAGE]
//
// Options:
//     -h, --help          Print help
//     -v, --version       Print version
//
// Record and review important changes to the project. Changes are recorded in
// REPO/docs/changelog.md
//
// - If you run the command without an argument, the changelog is printed to
//   stdout.
//
// - If you run the command with a message argument, the message will be
//   appended to the bottom of the changelog with a timestamp.
// `;
//
//   console.log(usage);
//   exit();
// }
//
// function printExit(msg) {
//   console.log(msg);
//   exit();
// }
//
//
// main(args);
