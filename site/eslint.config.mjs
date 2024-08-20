import pluginVue from 'eslint-plugin-vue'
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'
import vueI18n from '@intlify/eslint-plugin-vue-i18n'

export default [
  ...pluginVue.configs['flat/recommended'],
  ...vueI18n.configs['flat/recommended'],
  {
    rules: {
      'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
      'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    },
    ignores: [
      '**/.git/**',
      '**/build/**',
      '**/config/**',
      '**/dist/**',
      '**/node_modules/**',
    ],
    languageOptions: {
      globals: {},
      ecmaVersion: 'latest',
    },
    settings: {
      'vue-i18n': {
        localeDir: '../src/locales/*.json',
        messageSyntaxVersion: '^9.0.0',
      },
    },
  },
  eslintPluginPrettierRecommended,
]
