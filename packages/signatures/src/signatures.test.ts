import { describe, expect, it } from 'vitest';

import { generateSignature } from './index.js';

describe('signatureHelpers', () => {
  describe('generateSignature', () => {
    it('generates a signature', () => {
      const name = 'Huey';
      const result = generateSignature(name);
      expect(result).toBe('Sincerely, Huey');
    });
  });
});
