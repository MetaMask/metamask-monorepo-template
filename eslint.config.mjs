import base, { createConfig } from '@metamask/eslint-config';
import nodejs from '@metamask/eslint-config-nodejs';
import typescript from '@metamask/eslint-config-typescript';
import vitest from '@metamask/eslint-config-vitest';
import node from 'eslint-plugin-n';

const NODE_LTS_VERSION = 22;

const config = createConfig([
  ...base,
  {
    ignores: [
      '**/.tsc-lint-cache',
      '**/api-docs/**',
      '**/coverage/**',
      '**/dist/**',
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
      // Configuration files at the root, such as the Vitest and knip configs.
      '*.mts',
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
        tsconfigRootDir: import.meta.dirname,
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
    extends: [vitest],
    rules: {
      // We sometimes find conditionals to be useful, especially when mocking
      // functions.
      // Consider disabling this rule in `@metamask/eslint-config`.
      'vitest/no-conditional-in-test': 'off',

      // TODO: Upgrade these from warning to error in shared config
      'vitest/expect-expect': 'error',
      'vitest/no-alias-methods': 'error',
      'vitest/no-commented-out-tests': 'error',
      'vitest/no-disabled-tests': 'error',
    },
  },
  {
    // These files are test helpers, not tests. We still use the Vitest ESLint
    // config here to ensure that ESLint expects a test-like environment, but
    // various rules meant just to apply to tests have been disabled.
    files: ['**/tests/**/*.{js,ts}'],
    ignores: ['**/*.test.{js,ts}'],
    rules: {
      'vitest/no-export': 'off',
      'vitest/require-top-level-describe': 'off',
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
    files: ['**/*.mjs'],
    languageOptions: {
      sourceType: 'module',
    },
    settings: {
      // The default resolver does not follow the `exports` map of a package,
      // which subpaths such as `vitest/config` rely on.
      'import-x/resolver': {
        typescript: true,
      },
    },
  },
  // Prevent cross-package relative imports
  {
    files: ['packages/*/src/**/*.ts'],
    ignores: ['**/*.test.ts', '**/tests/**/*.ts'],
    rules: {
      'import-x/no-relative-packages': 'error',
    },
  },
  {
    // `import-x/extensions` doesn't support using ".js" for TypeScript
    // files(?), so we load the `n` plugin and use
    // `n/file-extension-in-import` instead.
    plugins: { n: node },

    rules: {
      'n/file-extension-in-import': ['error', 'always'],
      'import-x/extensions': [
        'error',
        {
          js: 'ignorePackages',
          ts: 'never',
          tsx: 'never',
          json: 'always',
        },
      ],
      'import-x/no-useless-path-segments': [
        'error',
        {
          noUselessIndex: false,
        },
      ],
    },
  },
]);

export default config;
