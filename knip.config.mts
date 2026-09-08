import type { KnipConfig } from 'knip';

const config: KnipConfig = {
  workspaces: {
    '.': {
      entry: ['scripts/**/*.{ts,js,sh}', '*.config.{js,cjs,mjs,ts}'],
      project: ['scripts/**/*.ts', '*.{js,cjs,mjs,ts}'],
      ignore: ['scripts/create-package/package-template/**'],
      ignoreDependencies: [
        // Installed for the `plugin-allow-scripts` Yarn plugin and the
        // `preinstall` lifecycle guard, neither of which knip can see.
        '@lavamoat/allow-scripts',
        '@lavamoat/preinstall-always-fail',
        // Passed to Jest as `--reporters=jest-silent-reporter` from package
        // scripts rather than imported.
        'jest-silent-reporter',
      ],
    },
    'packages/*': {
      ignoreDependencies: [
        // Invoked as `yarn auto-changelog` by the shared changelog scripts in
        // `scripts/`, so knip can't tie it back to this workspace.
        '@metamask/auto-changelog',
      ],
    },
  },
};

export default config;
