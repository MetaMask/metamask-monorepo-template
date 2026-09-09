import { defineConfig } from 'vitest/config';

/**
 * This configuration is used by the `test:scripts` script in `package.json`. It
 * covers the tooling in `scripts/`, not the packages.
 *
 * For a detailed explanation of each option, visit:
 * https://vitest.dev/config/
 */
export default defineConfig({
  test: {
    // Vitest enables watch mode by default. We disable it here, so it can be
    // explicitly enabled with `yarn test:scripts --watch`.
    watch: false,

    // The files to include in the test run.
    include: ['scripts/**/*.test.ts'],

    // The package template is copied verbatim by `create-package`, so its tests
    // are not run here.
    exclude: ['scripts/create-package/package-template/**'],

    // Fails a test that leaves a non-zero `process.exitCode` behind.
    setupFiles: ['./tests/scripts-setup.ts'],

    // Reset mocks between tests, so a mocked implementation cannot leak from
    // one test into the next.
    mockReset: true,
    restoreMocks: true,

    coverage: {
      enabled: true,

      // Keep the report out of the repository root, next to the code it
      // covers. `.gitignore` already excludes this path.
      reportsDirectory: 'scripts/coverage',

      // Configure the coverage provider. We use `istanbul` here, because it is
      // more stable than `v8`.
      provider: 'istanbul',

      // The files to include in the coverage report.
      include: ['scripts/**/*.ts'],

      // The files to exclude from the coverage report.
      exclude: ['scripts/create-package/package-template/**'],

      // Coverage thresholds for `create-package`. The rest of `scripts/` is not
      // covered yet, so it has no threshold.
      thresholds: {
        'scripts/create-package/**/*.ts': {
          branches: 100,
          functions: 100,
          lines: 100,
          statements: 100,
        },
      },
    },
  },
});
