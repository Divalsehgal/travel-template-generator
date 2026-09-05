import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import react from 'eslint-plugin-react'
import jsxA11y from 'eslint-plugin-jsx-a11y'
import tseslint from 'typescript-eslint'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist', 'design-tokens/build', 'src/vite-env.d.ts']),
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommended,
      react.configs.flat.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
      jsxA11y.flatConfigs.recommended,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    settings: {
      react: { version: 'detect' },
    },
    rules: {
      // React 19 / the new JSX transform means React no longer needs to be in scope.
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',

      // TypeScript already reports undefined vars; avoid double-reporting for
      // ambient/global types and keep `_`-prefixed args/vars as the escape hatch.
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],

      // Catch real bugs without blocking the gradual TS migration described in
      // TYPESCRIPT_MIGRATION.md (strict mode is intentionally off for now).
      '@typescript-eslint/no-explicit-any': 'warn',
      // This codebase deliberately uses `interface X extends Y {}` as a named
      // alias for composed types (see TYPE_REUSABILITY_GUIDE.md); only flag
      // interfaces that are empty AND don't extend anything.
      '@typescript-eslint/no-empty-object-type': [
        'warn',
        { allowInterfaces: 'with-single-extends' },
      ],

      // Promises/async correctness: these catch real bugs (unawaited Firestore
      // writes, unhandled rejections in effects/handlers) cheaply.
      'no-async-promise-executor': 'error',
      'require-atomic-updates': 'error',

      // General code-quality rules that surface real bugs.
      eqeqeq: ['error', 'smart'],
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'no-debugger': 'error',
      'no-duplicate-imports': 'error',
      'no-var': 'error',
      'prefer-const': 'error',
      curly: ['error', 'multi-line'],
    },
  },
])
