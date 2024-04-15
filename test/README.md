# README

Tests under this directory are excluded from normal Jest processing and
watching. They're meant to be run manually for integration testing.

Regular unit tests should be co-located under `src/` next to the code unit
they're testing; for example: `src/foo.js` and `src/foo.test.js`.

These tests are run with the following command:

```text
export NODE_ENV=test
export SERVER_URL=http://localhost:4321
npm run integration-tests
```

> [!NOTE]
>
> Jest automatically sets the `NODE_ENV` environment variable to `test` when
> running tests. It's not a bad practice to ensure it's set in case a test
> script runs independently.
