import base, { createConfig } from '@metamask/eslint-config';
import jest from '@metamask/eslint-config-jest';
import nodejs from '@metamask/eslint-config-nodejs';
import typescript from '@metamask/eslint-config-typescript';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const NODE_LTS_VERSION = 22;
const configDirName = dirname(fileURLToPath(import.meta.url));

const config = createConfig([
  ...base,
  {
    ignores: [
      '**/.tsc-lint-cache',
      '**/coverage/**',
      '**/dist/**',
      '**/docs/**',
      '.pnp.*',
      '.yarn/**',
      'merged-packages/**',
      'scripts/create-package/package-template/**',
    ],
  },
  {
    linterOptions: {
      reportUnusedDisableDirectives: 'error',
    },
  },
  {
    rules: {
      // Handled by Oxfmt.
      'prettier/prettier': 'off',
      'import-x/order': 'off',

      // TODO: Re-enable this rule
      // Enabling it with error suppression breaks `--fix`, because the autofixer for this rule
      // does not work very well.
      'jsdoc/require-jsdoc': 'off',
    },
    settings: {
      jsdoc: {
        mode: 'typescript',
      },
    },
  },
  {
    files: [
      '**/*.{js,cjs,mjs}',
      '**/*.test.{js,ts}',
      '**/tests/**/*.{js,ts}',
      'scripts/**/*.{ts,mts}',
    ],
    ignores: ['scripts/create-package/package-template/**/*.ts'],
    extends: [nodejs],
  },
  {
    files: ['**/*.{js,cjs}'],
    languageOptions: {
      sourceType: 'script',
      ecmaVersion: 2020,
    },
  },
  {
    files: ['**/*.ts', '**/*.mts'],
    extends: [typescript],
    languageOptions: {
      parserOptions: {
        tsconfigRootDir: configDirName,
      },
    },
    settings: {
      node: {
        version: `^${NODE_LTS_VERSION}`,
      },
    },
    rules: {
      // This rule does not detect multiple imports of the same file where types
      // are being imported in one case and runtime values are being imported in
      // another.
      'import-x/no-duplicates': 'off',

      // We sometimes use enums as substitutes for strings.
      // Consider disabling this rule in `@metamask/eslint-config`.
      '@typescript-eslint/no-unsafe-enum-comparison': 'off',

      // Enable rules that are disabled in `@metamask/eslint-config-typescript`.
      '@typescript-eslint/no-explicit-any': 'error',

      // TODO: Re-enable these rules
      // Enabling them with error suppression breaks `--fix`, because the autofixer for these rules
      // do not work very well.
      'jsdoc/check-tag-names': 'off',
      'jsdoc/require-jsdoc': 'off',
    },
  },
  {
    files: ['**/*.test.{js,ts}', '**/tests/**/*.{js,ts}'],
    extends: [jest],
    rules: {
      // We sometimes find conditionals to be useful, especially when mocking
      // functions.
      // Consider disabling this rule in `@metamask/eslint-config`.
      'jest/no-conditional-in-test': 'off',

      // TODO: Upgrade these from warning to error in shared config
      'jest/expect-expect': 'error',
      'jest/no-alias-methods': 'error',
      'jest/no-commented-out-tests': 'error',
      'jest/no-disabled-tests': 'error',
    },
  },
  // This should really be in `@metamask/eslint-config-typescript`
  {
    files: ['**/*.d.ts'],
    rules: {
      '@typescript-eslint/naming-convention': 'warn',
      'import-x/unambiguous': 'off',
    },
  },
  {
    files: ['scripts/*.ts'],
    rules: {
      // Scripts may be self-executable and thus have hashbangs.
      'n/hashbang': 'off',
    },
  },
  {
    files: ['**/jest.environment.js'],
    rules: {
      // These files run under Node, and thus `require(...)` is expected.
      'n/global-require': 'off',
    },
  },
  {
    files: ['**/*.mjs'],
    languageOptions: {
      sourceType: 'module',
    },
  },
]);

export default config;
