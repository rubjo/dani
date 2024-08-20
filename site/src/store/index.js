import { defineStore } from 'pinia'

const deferred = () => {
  var res, rej

  var promise = new Promise((resolve, reject) => {
    res = resolve
    rej = reject
  })

  promise.resolve = res
  promise.reject = rej

  return promise
}

export const useStore = defineStore({
  id: 'dani',
  state: () => ({
    settings: {},
  }),
  getters: {
    displayLanguage: (state) => {
      return (
        state.settings.displayLanguage ||
        localStorage.getItem('jls_displayLanguage') ||
        'en'
      )
    },
    paletteModel: (state) => {
      return (
        state.settings.paletteModel ||
        localStorage.getItem('jls_paletteModel') ||
        'balanced'
      )
    },
    hue: (state) => {
      if (state.settings.hue) return state.settings.hue
      if (localStorage.getItem('jls_hue'))
        return parseInt(localStorage.getItem('jls_hue'))
      return 200
    },
    sat: (state) => {
      if (state.settings.sat) return state.settings.sat
      if (localStorage.getItem('jls_sat'))
        return parseInt(localStorage.getItem('jls_sat'))
      return 50
    },
    lux: (state) => {
      if (state.settings.lux) return state.settings.lux
      if (localStorage.getItem('jls_lux'))
        return parseInt(localStorage.getItem('jls_lux'))
      return 25
    },
  },
  actions: {
    setSettings(value) {
      this.settings = value
    },
    saveSetting(keyValueObj) {
      const [key, value] = Object.entries(keyValueObj)[0]
      this.settings[key] = value
      window.localStorage.setItem('jls_' + key, value)
    },
  },
})
