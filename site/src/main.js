import { createApp } from 'vue'
import App from './App.vue'
import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'
import ToastService from 'primevue/toastservice'
import ConfirmationService from 'primevue/confirmationservice'
import DialogService from 'primevue/dialogservice'
import Tooltip from 'primevue/tooltip'
import { createPinia } from 'pinia'
import router from './router'
// Import localization package for global use in Vue
import { i18n } from './i18n'
import 'ninja-keys'
import 'victormono'

const app = createApp(App)

const store = createPinia()
app.use(store)

app.use(i18n)

app.use(router)

app.use(PrimeVue, {
  theme: {
    preset: Aura,
    options: {
      cssLayer: true,
    },
  },
})

// Necessary to display toasts throughout the app
// https://www.primefaces.org/primevue/showcase/#/toast
app.use(ToastService)

// ...and confirmations
app.use(ConfirmationService)

// ...and dynamic dialogs
app.use(DialogService)

app.directive('tooltip', Tooltip)

app.mount('#app')
