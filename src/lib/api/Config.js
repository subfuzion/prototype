import {env} from "node:process";

export default class Config {
  /** @type {string | undefined} */
  nodeEnv;

  /** @type {string | undefined} */
  serverUrl;

  /** @type {string | undefined}} */
  adapter;

  /**
   *  Get a config instance from the environment.
   *
   * If a config instance is provided, it will be updated; otherwise a new config
   * instance will be returned.
   * @param {Config | undefined} config
   * @return {Config}
   * @throws {Error}
   */
  static fromEnv(config) {
    config = config || new Config();
    config.nodeEnv = env.NODE_ENV || config.nodeEnv;
    config.serverUrl = env.SERVER_URL || config.serverUrl;
    config.adapter = env.API_ADAPTER || config.adapter;
    return config;
  }

  /**
   * Get a test config instance.
   *
   * If a config instance is provided, it will be updated; otherwise a new config
   * instance will be returned.
   * @param {Config | undefined} config
   * @return {Config}
   * @throws {Error}
   */
  static testConfigFromEnv(config) {
    const testConfig = new Config();
    testConfig.nodeEnv = "test";
    testConfig.adapter = "MockAdapter";

    // supplied config takes precedence over default test config
    if (config) {
      // override everything in default test config with supplied config values
      Object.assign(testConfig, config);

      // merge everything back to the supplied config
      Object.assign(config, Config);
    }
    else {
      config = testConfig;
    }

    // environment takes precedence
    config.nodeEnv = env.NODE_ENV || config.nodeEnv;
    config.serverUrl = env.SERVER_URL || config.serverUrl;
    config.adapter = env.API_ADAPTER || config.adapter;
    return config;
  }
}
