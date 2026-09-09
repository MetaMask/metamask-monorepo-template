# Writing and running tests

[Vitest](https://vitest.dev/) is used to ensure that code is working as expected. Ideally, all packages should have 100% test coverage.

Please follow the [MetaMask unit testing guidelines](https://github.com/MetaMask/contributor-docs/blob/main/docs/testing/unit-testing.md) when writing tests.

Vitest does not add `describe`, `it`, and `expect` as globals, so import them from `vitest` in each test file:

```typescript
import { describe, expect, it } from 'vitest';
```

Every package shares the configuration in `vitest.config.packages.mjs` at the root. If you need to customize the behavior of Vitest for a package, see `vitest.config.mjs` within that package. It is also where the package sets its coverage thresholds.

- Run `yarn workspace <workspaceName> run test` to run all tests for a package.
- Run `yarn workspace <workspaceName> run test <file>` to run a single test file within the context of a package.
- Run `yarn workspace <workspaceName> run test:watch` to re-run tests as you change files.
- Run `yarn test` to run tests for all packages, plus the tests for the scripts in `scripts/`.

> **Note**
>
> `workspaceName` in these commands is the `name` field within a package's `package.json`, e.g., `@metamask/greetings`, not the directory where it is located, e.g., `packages/greetings`.
