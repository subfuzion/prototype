# API client library API client Library for consuming APIs hosted under
`src/pages/api`. The client library needs to be configured. * `nodeEnv`: `dev` |
`test` | `staging` | `production` * `apiAdapter`: `MockAdapter` | `WebAdapter` *
`serverUrl`: *url* `serverUrl` can be undefined if using `MockAdapter`. It can
be configured with code or by using environment variables. ## Code Example
(using the default configuration values): ```javascript import Config from
"./path/to/lib/api/Config.js"; const config = new Config(); config.nodeEnv =
"dev"; config.serverUrl = "http://localhost:4321"; config.apiAdapter =
"WebAdapter"; ``` ## Environment variables Example: ```text export NODE_ENV=dev
export SERVER_URL=http://localhost:4321 export API_ADAPTER=WebAdapter ``` See
possible values in the preceding section. ```javascript import Config from
"./path/to/lib/api/Config.js"; const config = Config.fromEnv(); ``` ## Test
configuration There is a test helper that returns a client configured for
testing. The following example shows getting a test config and overriding the
default `serverUrl` value: ```javascript import Config from
"./path/to/lib/api/Config.js"; const config = Config.testConfigFromEnv();
config.serverUrl = "http://localhost:8000"; ``` The tests use Jest, which
automatically sets `NODE_ENV` to `test`. This can only overridden with code.

