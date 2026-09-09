/**
 * Formatting of files in this repo is handled by Oxfmt (see `.oxfmtrc.json`).
 * Prettier remains configured here because `create-package` uses it to format
 * the JSON files it generates.
 *
 * @type {import('prettier').Options}
 */
module.exports = {
  // All of these are defaults except singleQuote, but we specify them
  // for explicitness
  quoteProps: 'as-needed',
  singleQuote: true,
  tabWidth: 2,
  trailingComma: 'all',
};
