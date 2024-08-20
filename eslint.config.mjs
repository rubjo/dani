import babelParser from '@babel/eslint-parser'
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'

export default [
  {
    ignores: [
      '**/.git/**',
      '**/build/**',
      '**/config/**',
      '**/dist/**',
      '**/node_modules/**',
    ],
  },
  {
    rules: {
      // 'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
      // 'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    },
    languageOptions: {
      globals: {},
      ecmaVersion: 'latest',
      parser: babelParser,
    },
  },
  eslintPluginPrettierRecommended,
]
