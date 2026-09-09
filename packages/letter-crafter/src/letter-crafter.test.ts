import { describe, expect, it } from 'vitest';

import { craftThankYouLetter } from './index.js';

describe('letter-crafter', () => {
  describe('craftThankYouLetter', () => {
    it('crafts a thank you letter', () => {
      const result = craftThankYouLetter('Huey', 'Louie');
      expect(result).toBe(
        'Hello, Huey!\n\nThank you for the gift.\n\nSincerely, Louie',
      );
    });
  });
});
