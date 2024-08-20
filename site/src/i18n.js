import { nextTick } from 'vue'
import { createI18n } from 'vue-i18n'

export const SUPPORT_LOCALES = ['en', 'nb']

export const i18n = createI18n({
  legacy: false, // Enable composition API
  globalInjection: true, // Enable $t etc everywhere
  fallbackLocale: 'en',
})

// Lazily load locales, from https://vue-i18n.intlify.dev/guide/advanced/lazy.html
const loadLanguageAsync = async (locale) => {
  // load locale messages with dynamic import
  const messages = await import(`./locales/${locale}.json`)

  // set locale message
  i18n.global.setLocaleMessage(locale, messages.default)

  return nextTick()
}

export const setI18nLanguage = async (locale) => {
  // Locale not yet loaded: load it
  if (!i18n.global.messages.value[locale]) await loadLanguageAsync(locale)

  i18n.global.locale.value = locale

  document.querySelector('html').setAttribute('lang', locale)
}

setI18nLanguage(localStorage.getItem('jls_displayLanguage') || 'en')
