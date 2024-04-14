import * as assert from 'node:assert/strict';

import {Scanner, Token, TokenType} from './scanner.js';

/**
 * Tests use a combination of expect and assert
 *
 * - expect assertions provides better detail for identifying precisely the
 *   reason why an assertion failed, so these should come first
 *
 * - assert.ok assertions are a useful sanity check for testing how the code
 *   will be used (which is also useful as a form of documentation), but failure
 *   output isn't as helpful since all that gets reported is a boolean failure
 */

describe('TokenType', () => {

  test('equality', () => {
    let tt_punctuation = TokenType.punctuation;

    expect(tt_punctuation).toBe(TokenType.punctuation);
    expect(tt_punctuation.name).toBe("punctuation");
    expect(tt_punctuation.name).toBe(TokenType.punctuation.name);
    expect(tt_punctuation.type).toBe(TokenType.punctuation.type);

    assert.ok(tt_punctuation.name === "punctuation");
    assert.ok(tt_punctuation.name === TokenType.punctuation.name);
    assert.ok(tt_punctuation.type === TokenType.punctuation.type);
  });

});

describe("Token", () => {

  test("constructor", () => {
    let token = new Token({text: ",", "type": TokenType.punctuation});
    expect(token.text).toBe(",");
    expect(token.type).toBe(TokenType.punctuation);
    expect(token.value).toBe(",");

    assert.ok(token.text === ",");
    assert.ok(token.type === TokenType.punctuation);
    assert.ok(token.value === ",");
  });

  test("value defaults to text", () => {
    let token = new Token({text: "foo", "type": TokenType.string});
    expect(token.value).toBe("foo");
  });

});

describe("Scanner", () => {

  describe("Basic arguments", () => {

    test("single argument", () => {
      const input = "foo";
      const scanner = new Scanner();
      const tokens = scanner.scan(input).tokens;

      expect(tokens.length).toBe(1);

      const token = tokens[0];
      expect(token.text).toBe("foo");
      expect(token.type).toBe(TokenType.string);
      expect(token.startCol).toBe(0);
      expect(token.endCol).toBe(3);
      expect(token.length).toBe(3);
    });

    test("two arguments", () => {
      const input = "foo bar";
      const scanner = new Scanner();
      const tokens = scanner.scan(input).tokens;

      expect(tokens.length).toBe(2);

      const token1 = tokens[0];
      expect(token1.text).toBe("foo");
      expect(token1.type).toBe(TokenType.string);
      expect(token1.startCol).toBe(0);
      expect(token1.endCol).toBe(3);
      expect(token1.length).toBe(3);

      const token2 = tokens[1];
      expect(token2.text).toBe("bar");
      expect(token2.type).toBe(TokenType.string);
      expect(token2.startCol).toBe(4);
      expect(token2.endCol).toBe(7);
      expect(token2.length).toBe(3);
    });

    test("multiple arguments and extra whitespace", () => {
      const input = "\t foo \r bar \n baz\n";
      const scanner = new Scanner();
      const tokens = scanner.scan(input).tokens;

      expect(tokens.length).toBe(3);

      const token1 = tokens[0];
      expect(token1.text).toBe("foo");
      expect(token1.type).toBe(TokenType.string);
      expect(token1.startCol).toBe(2);
      expect(token1.endCol).toBe(5);
      expect(token1.length).toBe(3);

      const token2 = tokens[1];
      expect(token2.text).toBe("bar");
      expect(token2.type).toBe(TokenType.string);
      expect(token2.startCol).toBe(8);
      expect(token2.endCol).toBe(11);
      expect(token2.length).toBe(3);

      const token3 = tokens[2];
      expect(token3.text).toBe("baz");
      expect(token3.type).toBe(TokenType.string);
      expect(token3.startCol).toBe(14);
      expect(token3.endCol).toBe(17);
      expect(token3.length).toBe(3);
    });

    test("multiple arguments (one is a number)", () => {
      const input = "foo 200 bar";
      const scanner = new Scanner();
      const tokens = scanner.scan(input).tokens;

      expect(tokens.length).toBe(3);

      const token1 = tokens[0];
      expect(token1.text).toBe("foo");
      expect(token1.type).toBe(TokenType.string);
      expect(token1.value).toBe("foo");
      expect(token1.startCol).toBe(0);
      expect(token1.endCol).toBe(3);
      expect(token1.length).toBe(3);

      const token2 = tokens[1];
      expect(token2.text).toBe("200");
      expect(token2.type).toBe(TokenType.number);
      expect(token2.value).toBe(200);
      expect(token2.startCol).toBe(4);
      expect(token2.endCol).toBe(7);
      expect(token2.length).toBe(3);

      const token3 = tokens[2];
      expect(token3.text).toBe("bar");
      expect(token3.type).toBe(TokenType.string);
      expect(token3.startCol).toBe(8);
      expect(token3.endCol).toBe(11);
      expect(token3.length).toBe(3);
    });

  });

  describe("Assignment", () => {

    test("basic assignment", () => {
      const input = "foo=bar";
      const scanner = new Scanner();
      const tokens = scanner.scan(input).tokens;
      expect(tokens.length).toBe(3);
    });

    test("multiple assignments", () => {
      const input = "foo=bar baz=boo";
      const scanner = new Scanner();
      const tokens = scanner.scan(input).tokens;
      expect(tokens.length).toBe(6);
    });

    test("assignment with any spaces is an error", () => {
      const input = "foo = bar";
      const scanner = new Scanner();
      expect(() => scanner.scan(input)).toThrow();
    });
  });

  describe("List assignments", () => {

    test("basic assignment with a list", () => {
      const input = "foo=bar,baz,boo";
      const scanner = new Scanner();
      const tokens = scanner.scan(input).tokens;
      expect(tokens.length).toBe(3);
    });

    test("basic assignment with a list with a number", () => {
      const input = "foo=bar,2.1,boo";
      const scanner = new Scanner();
      const tokens = scanner.scan(input).tokens;
      expect(tokens.length).toBe(3);
      expect(Array.isArray(tokens[2].value)).toBe(true);
      const list = tokens[2].value;
      expect(list[1]).toBe(2.1);
    });

  });

  describe("Assignment with quoted string", () => {

    test("basic assignment", () => {
      const input = 'foo="bar"';
      const scanner = new Scanner();
      const tokens = scanner.scan(input).tokens;
      expect(tokens.length).toBe(3);
      expect(tokens[2].value).toBe("bar");
      expect(tokens[2].type).toBe(TokenType.quotedString);
    });

    test("multiple assignments", () => {
      const input = "foo=bar baz=\"boo\"";
      const scanner = new Scanner();
      const tokens = scanner.scan(input).tokens;
      expect(tokens.length).toBe(6);
      expect(tokens[5].value).toBe("boo");
      expect(tokens[5].type).toBe(TokenType.quotedString);
    });
  });

});

describe("Samples", () => {
  const tests = [
    {
      input: "foo bar baz",
      tokens: [
        {value: "foo", type: TokenType.string},
        {value: "bar", type: TokenType.string},
        {value: "baz", type: TokenType.string},
      ],
    },
    {
      input: "foo=bar baz=boo",
      tokens: [
        {value: "foo", type: TokenType.string},
        {value: "=", type: TokenType.assignment},
        {value: "bar", type: TokenType.string},
        {value: "baz", type: TokenType.string},
        {value: "=", type: TokenType.assignment},
        {value: "boo", type: TokenType.string},
      ],
    },
    {
      input: 'foo="bar" baz=boo',
      tokens: [
        {value: "foo", type: TokenType.string},
        {value: "=", type: TokenType.assignment},
        {value: "bar", type: TokenType.quotedString},
        {value: "baz", type: TokenType.string},
        {value: "=", type: TokenType.assignment},
        {value: "boo", type: TokenType.string},
      ],
    },
    {
      input: 'foo="bar" baz="boo"',
      tokens: [
        {value: "foo", type: TokenType.string},
        {value: "=", type: TokenType.assignment},
        {value: "bar", type: TokenType.quotedString},
        {value: "baz", type: TokenType.string},
        {value: "=", type: TokenType.assignment},
        {value: "boo", type: TokenType.quotedString},
      ],
    },
    {
      input: 'foo=bar baz="boo" bob="bee"',
      tokens: [
        {value: "foo", type: TokenType.string},
        {value: "=", type: TokenType.assignment},
        {value: "bar", type: TokenType.string},
        {value: "baz", type: TokenType.string},
        {value: "=", type: TokenType.assignment},
        {value: "boo", type: TokenType.quotedString},
        {value: "bob", type: TokenType.string},
        {value: "=", type: TokenType.assignment},
        {value: "bee", type: TokenType.quotedString},
      ],
    },
    {
      input: 'foo="bar" baz="boo" bob="bee"',
      tokens: [
        {value: "foo", type: TokenType.string},
        {value: "=", type: TokenType.assignment},
        {value: "bar", type: TokenType.quotedString},
        {value: "baz", type: TokenType.string},
        {value: "=", type: TokenType.assignment},
        {value: "boo", type: TokenType.quotedString},
        {value: "bob", type: TokenType.string},
        {value: "=", type: TokenType.assignment},
        {value: "bee", type: TokenType.quotedString},
      ],
    },
    {
      input: "foo bar=a,b,c baz",
      tokens: [
        {value: "foo", type: TokenType.string},
        {value: "bar", type: TokenType.string},
        {value: "=", type: TokenType.assignment},
        {value: ['a','b','c'], type: TokenType.array},
        {value: "baz", type: TokenType.string},
      ],
    },
    {
      input: 'foo bar="a,b,c" baz',
      tokens: [
        {value: "foo", type: TokenType.string},
        {value: "bar", type: TokenType.string},
        {value: "=", type: TokenType.assignment},
        {value: "a,b,c", type: TokenType.quotedString},
        {value: "baz", type: TokenType.string},
      ],
    },
    {
      skip: true,
      input: 'foo bar=a,"b",c baz',
      tokens: [
        {value: "foo", type: TokenType.string},
        {value: "bar", type: TokenType.string},
        {value: "=", type: TokenType.assignment},
        {value: "a,b,c", type: TokenType.quotedString},
        {value: "baz", type: TokenType.string},
      ],
    },
    {
      input: 'foo -h --rm -it cool --baz=boo --bob bee',
      tokens: [
        {value: "foo", type: TokenType.string},
        {value: "-h", type: TokenType.string},
        {value: "--rm", type: TokenType.string},
        {value: "-it", type: TokenType.string},
        {value: "cool", type: TokenType.string},
        {value: "--baz", type: TokenType.string},
        {value: "=", type: TokenType.assignment},
        {value: "boo", type: TokenType.string},
        {value: "--bob", type: TokenType.string},
        {value: "bee", type: TokenType.string},
      ],
    },
  ];

  tests.forEach((t) => {
    if (t.skip) return;
    const scanner = new Scanner();
    const tokens = scanner.scan(t.input).tokens;
    // console.log("*************************");
    // console.log(tokens)

    expect(tokens.length).toBe(t.tokens.length);
    for (let i = 0; i < tokens.length; i++) {
      expect(tokens[i].value).toEqual(t.tokens[i].value);
      expect(tokens[i].type).toBe(t.tokens[i].type);
    }
  });

});
