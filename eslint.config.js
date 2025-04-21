import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import reactPlugin from 'eslint-plugin-react';
import * as parserTs from '@typescript-eslint/parser';
import prettier from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';

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
      prettier,
    },
    rules: {
      'react/react-in-jsx-scope': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '_' },
      ],
      'prettier/prettier': 'error',
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
  prettierConfig,
];
