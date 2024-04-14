import process from "node:process";
import util from "node:util";

import {processName} from './utils.js';

/**
 * An enum class for TokenType. Add new token types as static fields.
 * @enum { TokenType }
 */
export class TokenType {
  static string = new TokenType("string");
  static number = new TokenType("number");
  static boolean = new TokenType("boolean");
  static array = new TokenType("array");
  static punctuation = new TokenType("punctuation");

  /** @param { string } name */
  #name;

  /** @param { Symbol } type */
  #type;

  /** @param { string } name */
  constructor(name) {
    this.#name = name;
    this.#type = Symbol(name);
  }

  /** @return { string } */
  get name() {
    return this.#name;
  }

  /** @return { Symbol } */
  get type() {
    return this.#type;
  }

  /**
   * @override
   * @return { string }
   */
  toString() {
    return this.name;
  }

  /**
   * Custom util.inspect required for console.log to work
   */
  [util.inspect.custom](depth, options, inspect) {
    return options.stylize(`[TokenType] ${this.name}`, "string");
  }
}


export class Token {
  /**
   * The 0-based starting column position of the token's text in the buffer
   * Example: the startCol for "foo" in "..foo.." is 2
   * @type {number}
   */
  startCol;

  /**
   * The 0-based ending column position of the token's text in the buffer
   * Example: the endCol for "foo" in "..foo.." is 4
   * @type {number}
   */
  endCol;

  /**
   * The length of the token's text in the buffer
   * Example: the len for "foo" in "..foo.." is (endCol - startCol) + 1) === 3
   * @type {number}
   */
  len;

  /**
   * The scanned raw text
   * @type {string}
   */
  text;

  /**
   * The processed text
   * @type {string}
   */
  #value;

  /** @type {TokenType} */
  type;

  /**
   * @param { object } fields
   */
  constructor(fields) {
    this.text = fields?.text;
    this.type = fields?.type;
  }

  /**
   * Get the processed value from text
   * @return { string }
   */
  value() {
    return this.#value ?? this.text;
  }


  /**
   * @override
   * @return { string }
   */
  toString() {
    return `{ text: "${this.text}", type: ${this.type}, value: "${this.value}", col: ${this.startCol}`;
  }

  /**
   * Custom util.inspect required for console.log to work
   */
  [util.inspect.custom](depth, options, inspect) {
    return options.stylize(
        `[Token] ${this.toString()}`,
        "string");
  }
}

/**
 * HACK: scans a string, scan should return an iterator
 */
export class Scanner {
  /** @type {object} */
  #options;

  /** @type {string} */
  #buffer;

  /** @type {number} */
  #col = 0;

  /** @type { Token[]} */
  #tokens = [];

  /**
   * @param {object} options
   */
  constructor(options) {
    this.#options = options;
  }

  /** @return {string} */
  get buffer() {
    return this.#buffer;
  }

  /** @return { Token[] } */
  tokens() {
    return this.#tokens;
  }

  /**
   * @param {string} buffer
   * @return {Scanner}
   */
  scan(buffer) {
    this.#buffer = buffer;
    this.#col = 0;

    for (let i = 0; i < this.#buffer.length; i++)) {

    }

    return this;
  }

  matchQuote
}




// class NanoCli {
//   /** @type { NanoCli } */
//   static #instance;
//
//   #args = process.argv.slice(2);
//   #name = processName();
//   #version = "0.0.1";
//   #description = "";
//
//   constructor() {
//   }
//
//   /**
//    * @return { NanoCli }
//    */
//   static instance() {
//     if (!NanoCli.#instance) {
//       NanoCli.#instance = new NanoCli();
//     }
//     return NanoCli.#instance;
//   }
//
//   /**
//    * @param { string? } s
//    * @return { string | NanoCli }
//    */
//   name(s) {
//     if (s) {
//       this.#name = s;
//       return this;
//     } else {
//       return this.#name;
//     }
//   }
//
//   /**
//    * @param { string? } v
//    * @return { string | NanoCli }
//    */
//   version(v) {
//     if (v) {
//       this.#version = v;
//       return this;
//     } else {
//       return this.#version;
//     }
//   }
//
//   /**
//    * @param { string? } d
//    * @return { string | NanoCli }
//    */
//   description(d) {
//     if (d) {
//       this.#description = d;
//       return this;
//     } else {
//       return this.#description;
//     }
//   }
//
//   /**
//    * @param { string? } argv
//    * @return { NanoCli }
//    */
//   run(argv) {
//     const args = argv || this.#args;
//
//     switch (this.#getArg(0)) {
//       case "-h":
//       case "--help":
//         this.printUsageExit();
//         break;
//       case "-v":
//       case "--version":
//         this.printVersionExit();
//         break;
//     }
//
//     return this;
//   }
//
//   #getArg(index) {
//     const args = this.#args;
//     return args && args.length > index ? args[index] : null;
//   }
//
//   printExit(msg) {
//     console.log(msg);
//     process.exit();
//   }
//
//   printVersionExit() {
//     this.printExit(this.version());
//   }
//
//   printUsageExit() {
//     const usage =
//         `${this.name()} ${this.version()}
//
// Usage:
//     ${this.#name} [MESSAGE]
//
// Options:
//     -h, --help          Print help
//     -v, --version       Print version
//
// ${this.description()}
// `;
//
//     console.log(usage);
//     process.exit();
//   }
//
//   exit(code) {
//     process.exit(code);
//   }
// }
//
// export default function Cmd() {
//   return NanoCli.instance();
// }
//
