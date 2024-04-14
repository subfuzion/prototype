import util from "node:util";

export class TokenType {
  static end = new TokenType("end");
  static ws = new TokenType("ws");
  static string = new TokenType("string");
  static quotedString = new TokenType("quotedString");
  static number = new TokenType("number");
  static boolean = new TokenType("boolean");
  static array = new TokenType("array");
  static punctuation = new TokenType("punctuation");
  static assignment = new TokenType("assignment");

  /** @type { string } */
  #name;

  /** @type { Symbol } */
  #type;

  /** @param { string } name */
  constructor(name) {
    this.#name = name;
    this.#type = Symbol(name);
  }

  /** @return {string} */
  get name() {
    return this.#name;
  }

  /** @return {Symbol} */
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
  [util.inspect.custom](_depth, options, _inspect) {
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
   * The 0-based, non-inclusive ending column position of the token's text in the buffer
   * Example: the endCol for "foo" in "..foo.." is 5
   * @type {number}
   */
  endCol;

  /**
   * The scanned raw text
   * @type {string}
   */
  text;

  /**
   * The processed text
   * @type {string | number | array}
   */
  value;

  /** @type {TokenType} */
  type;

  /**
   * @param { object } fields
   */
  constructor(fields) {
    const keys = [
      "text",
      "type",
      "value",
      "startCol",
      "endCol",
    ];

    const map = keys.reduce((acc, key) => {
      acc[key] = fields[key];
      return acc;
    }, {});

    Object.assign(this, map);
    if (!this.value) {
      this.value = this.text;
    }
  }

  /**
   * The length of the token's text in the buffer
   * Example: the length for "foo" in "..foo.." is (endCol - startCol) === 3
   * @return {number}
   */
  get length() {
    return this.endCol - this.startCol;
  }

  /**
   * @override
   * @return { string }
   */
  toString() {
    const keys = [
      "type",
      "value",
      "text",
      "startCol",
      "endCol",
      "length",
    ];

    const map = keys.reduce((acc, key) => {
      acc[key] = this[key];
      return acc;
    }, {});

    return util.inspect(map);
  }

  /**
   * Custom util.inspect required for console.log to work
   */
  [util.inspect.custom](_depth, options, _inspect) {
    return options.stylize(`[Token] ${this.toString()}`, "string");
  }
}

/**
 * HACK: scans a string, scan should return an iterator
 */
export class Scanner {
  static whitespacePattern = [
    " ",
    "\t",
    "\n",
    "\r"
  ];
  static whitespaceRegex = /\s+/;

  static quotesPattern = [
    "'",
    '"',
    "`"
  ];
  static quotesRegex = [
    "'",
    '"',
    "`"
  ];

  static assignmentPattern = "=";
  static assignmentRegex = "=";

  static separatorPattern = ",";
  static separatorRegex = ",";

  /** @type {string} */
  #buffer;

  /** @type {number} */
  #col = 0;

  /** @type { Token[]} */
  #tokens = [];

  /** @return {string} */
  get buffer() {
    return this.#buffer;
  }

  /** @return { Token[] } */
  get tokens() {
    return this.#tokens;
  }

  /**
   * @param {string} buffer
   * @return {Scanner}
   */
  scan(buffer) {
    this.#buffer = buffer;
    this.#col = 0;

    while (this.#col < this.#buffer.length) {
      let token;

      if (this.matchWhitespace()) {
        this.skipWhitespace();
        continue;
      }
      else if (this.matchAssignment()) {
        token = this.readAssignment();
      }
      else if (this.matchQuote()) {
        token = this.readQuotedString();
      }
      else {
        token = this.readString();
      }

      this.#tokens.push(token);
      this.#col = token.endCol;
    }

    return this;
  }

  readQuotedString() {
    let startCol = this.#col;
    let quote = this.peek(startCol);
    let i = startCol + 1;
    let max = this.#buffer.length;

    for (; i < max; i++) {
      let ch = this.peek(i);

      if (ch === quote) {
        i++; // include the final quote for text
        break;
      }
    }

    const text = this.#buffer.slice(startCol, i);

    return new Token({
      text: text,
      type: TokenType.quotedString,
      value: text.slice(1, -1), // strip quotes for value
      startCol: startCol,
      endCol: i,
    });
  }

  readString() {
    const startCol = this.#col;
    let i = startCol;
    let max = this.#buffer.length;

    const matchers = [
      Scanner.whitespacePattern,
      Scanner.quotesPattern,
      Scanner.assignmentPattern,
    ];

    matching:
        for (; i < max; i++) {
          let ch = this.peek(i);

          for (let dontMatch = 0; dontMatch < matchers.length; dontMatch++) {
            if (matchers[dontMatch].includes(ch)) {
              break matching;
            }
          }
        }

    const text = this.#buffer.slice(startCol, i);

    const isNumber = (s) => !isNaN(Number(s));

    // TODO: split won't work if pattern is an array (which one to use for split?), handle later.
    if (text.includes(Scanner.separatorPattern)) {
      let splits = text.split(Scanner.separatorPattern);

      splits = splits.map((s) => isNumber(s) ? Number(s) : s);

      return new Token({
        text: text,
        type: TokenType.array,
        value: splits,
        startCol: startCol,
        endCol: i,
      });
    }

    let token = new Token({
      text: text,
      type: TokenType.string,
      startCol: startCol,
      endCol: i,
    });

    if (isNumber(token.value)) {
      token.type = TokenType.number;
      token.value = Number(text);
    }

    return token;
  }

  readAssignment() {
    const startCol = this.#col;

    const prev = this.peek(startCol - 1);
    const next = this.peek(startCol + 1);

    [
      prev,
      next
    ].forEach((ch) => {
      if (Scanner.whitespacePattern.includes(ch)) {
        // startCol+1 since users usually expect 1-based positions in the shell
        throw new Error(
            `Can't have any space before or after '=' in position ${startCol
            + 1} of the input`);
      }
    });

    return new Token({
      text: this.read(),
      type: TokenType.assignment,
      startCol: startCol,
      endCol: this.#col,
    });
  }

  match(index, pattern) {
    if (Array.isArray(pattern)) {
      return pattern.includes(this.#buffer[index]);
    }
    return this.#buffer[index] === pattern;
  }

  matchWhitespace() {
    return this.match(this.#col, Scanner.whitespacePattern);
  }

  matchQuote() {
    return this.match(this.#col, Scanner.quotesPattern);
  }

  matchAssignment() {
    return this.match(this.#col, Scanner.assignmentPattern);
  }

  matchSeparator(index) {
    return this.match(index, Scanner.separatorPattern);
  }

  readToNextQuote(_index) {
  }

  skip() {
    this.#col++;
  }

  skipWhitespace() {
    while (this.matchWhitespace(this.#col) && this.#col < this.#buffer.length) {
      this.skip();
    }
  }

  read() {
    return this.#buffer[this.#col++];
  }

  peek(index) {
    return this.#buffer[index];
  }
}
