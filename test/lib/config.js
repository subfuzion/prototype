import {env} from "node:process";

export class Config {
  /** @type {string} */
  nodeEnv;
  /** @type {string} */
  serverUrl;

  /**
   *
   * @param {object?} defaults
   * @return {Config}
   */
  static fromEnv(defaults) {
    const config = new Config();
    let val;

    val = env.NODE_ENV || defaults?.nodeEnv;
    if (!val) throw new Error("NODE_ENV is not set");
    config.nodeEnv = val;

    val = env.SERVER_URL || defaults?.serverUrl;
    if (!val) throw new Error("SERVER_URL is not set");
    config.serverUrl = env.SERVER_URL;

    return config;
  }
}
