import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import type { MockedFunction } from 'vitest';

import cli from './cli.js';
import { commands } from './commands.js';

vi.mock('./cli.js');

describe('create-package/index', () => {
  let originalProcess: typeof globalThis.process;
  beforeEach(() => {
    originalProcess = globalThis.process;
    // A copy, so the test can assert on `process.exitCode` without
    // changing the real process.
    globalThis.process = { ...globalThis.process };
  });

  afterEach(() => {
    globalThis.process = originalProcess;
  });

  it('executes the CLI application', async () => {
    const mock = cli as MockedFunction<typeof cli>;
    mock.mockRejectedValue('foo');

    vi.spyOn(console, 'error').mockImplementation(() => undefined);

    await import('./index.js');
    await new Promise((resolve) => setImmediate(resolve));

    expect(cli).toHaveBeenCalledTimes(1);
    expect(cli).toHaveBeenCalledWith(process.argv, commands);
    expect(console.error).toHaveBeenCalledTimes(1);
    expect(console.error).toHaveBeenCalledWith('foo');
    expect(process.exitCode).toBe(1);
  });
});
