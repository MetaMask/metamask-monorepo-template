import { basename } from 'path';
import { mergeConfig } from 'vitest/config';

import baseConfig from '../../vitest.config.packages.mjs';

export default mergeConfig(baseConfig, {
  test: {
    // The display name when running multiple projects.
    name: basename(import.meta.dirname),

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
