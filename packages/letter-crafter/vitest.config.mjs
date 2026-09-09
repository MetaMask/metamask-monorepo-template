import { basename, dirname } from 'path';
import { fileURLToPath } from 'url';
import { mergeConfig } from 'vitest/config';

import baseConfig from '../../vitest.config.packages.mjs';

// `import.meta.dirname` needs Node >= 21.2, but this repo supports Node 18.
const packageDirectory = dirname(fileURLToPath(import.meta.url));

export default mergeConfig(baseConfig, {
  test: {
    // The display name when running multiple projects.
    name: basename(packageDirectory),

    coverage: {
      // The test run fails when coverage drops below these.
      thresholds: {
        branches: 100,
        functions: 100,
        lines: 100,
        statements: 100,
      },
    },
  },
});
