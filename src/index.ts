import type { ESLint } from 'eslint';
import { DEFAULT_DISALLOWED_STRINGS, noInvalidStrings } from './rules/no-invalid-strings.js';

/**
 * ESLint Plugin: No Brian
 */
const plugin: ESLint.Plugin = {
  meta: {
    name: 'eslint-plugin-no-brian',
    version: '1.0.0'
  },
  rules: {
    'no-invalid-strings': noInvalidStrings
  }
};

plugin.configs = {
  recommended: {
    plugins: {
      'no-brian': plugin
    },
    rules: {
      'no-brian/no-invalid-strings': ['error', DEFAULT_DISALLOWED_STRINGS]
    }
  }
};

export default plugin;