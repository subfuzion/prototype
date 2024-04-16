import {beforeAll, describe, expect, test} from "@jest/globals";
import * as assert from "node:assert/strict";
import {Config} from "../lib/Config.js";


describe("Configuration", () => {
  let config;

  beforeAll(() => {
    const defaults = {
      nodeEnv:   "test",
      serverUrl: "http://localhost:4321",
    };
    config = Config.fromEnv(defaults);
    expect(config.nodeEnv).toBe("test");
  });

  describe("Server", () => {
    test("head check", () => {

    });
  });
});
