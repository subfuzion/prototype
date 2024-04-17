import * as assert from 'node:assert/strict';
import util from "node:util";

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


describe.skip("whitespace pattern", () => {
  const whitespacePattern = /\s/g;

  const tests = [
    { input: " ", lastIndex: 0, expect: true },
    { input: " foo", lastIndex: 1, expect: false },
    // { input: "foo ", lastIndex: 0, expect: false },
    // { input: "foo ", lastIndex: 2, expect: false },
    // { input: "foo ", lastIndex: 3, expect: true },
    // { input: "foo bar", lastIndex: 3, expect: true },
    // { input: "foo bar", lastIndex: 4, expect: false },
    // { input: "foo bar", lastIndex: 6, expect: false },
    // { input: "foo bar", lastIndex: 7, expect: true },
    // { input: "foo bar", lastIndex: 8, expect: true },
  ];

  test("identifiers", () => {
    tests.forEach((t, index) => {
      whitespacePattern.lastIndex = t.lastIndex;

      console.log(`${index}: ${whitespacePattern.test(t.input)}`);

      whitespacePattern.lastIndex = t.lastIndex;
      assert.equal(whitespacePattern.test(t.input), t.expect, `${index}: ${util.inspect(t)}`);
    });
  });

});

describe("string pattern", () => {
  const stringPattern = /\w+/;

  const tests = [
      "foo",
      "foo = bar"
  ]

  test("identifiers", () => {
    tests.forEach((input, index) => {
      assert.ok(stringPattern.test(input));
    });
  });

});


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
