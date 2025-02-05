import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import reactPlugin from 'eslint-plugin-react';
import * as parserTs from '@typescript-eslint/parser';

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parser: parserTs,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        ...globals.browser,
        React: 'readonly',
      },
    },
    plugins: {
      react: reactPlugin,
    },
    rules: {
      'react/react-in-jsx-scope': 'off',
      // Add any other rules you want to configure
    },
  },
  {
    ignores: [
      '.husky/',
      '.output/',
      '.vscode/',
      '.wtx/',
      '.wxt/types/imports.d.ts',
      'assets/',
      'node_modules/',
      'public/icon/',
    ],
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
];
