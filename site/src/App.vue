<template>
  <div :lang="store.displayLanguage">
    <HeroBlock />

    <div class="page-wrapper">
      <NavBar />

      <MenuWrapper />

      <div class="content">
        <router-view />
      </div>
    </div>

    <PToast>
      <template #message="slotProps">
        <div class="p-toast-message-text">
          <span class="p-toast-summary flex align-items-center">
            <IconAlertCircle class="mr-1" style="stroke-width: 0.1rem" />
            {{ slotProps.message.summary }}
          </span>
          <div class="p-toast-detail">
            {{ slotProps.message.detail }}
          </div>
          <div v-if="slotProps.message.onConfirm" class="mt-1">
            <p-button
              class="p-button-sm px-2 py-0"
              severity="secondary"
              :label="slotProps.message.confirmText"
              @click="slotProps.message.onConfirm"
            />
          </div>
        </div>
      </template>
    </PToast>

    <NinjaKeysWrapper />
  </div>
</template>

<script setup>
  //
  //                                ,,
  //    .M"""bgd                    db             mm
  //   ,MI    "Y                                   MM
  //   `MMb.      ,p6"bo `7Mb,od8 `7MM `7MMpdMAo.mmMMmm
  //     `YMMNq. 6M'  OO   MM' "'   MM   MM   `Wb  MM
  //   .     `MM 8M        MM       MM   MM    M8  MM
  //   Mb     dM YM.    ,  MM       MM   MM   ,AP  MM
  //   P"Ybmmd"   YMbmd' .JMML.   .JMML. MMbmmd'   `Mbmo
  //                                     MM
  //                                   .JMML.

  import PToast from 'primevue/toast'
  import PButton from 'primevue/button'

  // Import silly sample JS library
  import SimpleZoom from '../../dist/index.js'

  import MenuWrapper from './components/navigation/MenuWrapper.vue'
  import NavBar from './components/navigation/NavBar.vue'
  import NinjaKeysWrapper from './components/navigation/NinjaKeysWrapper.vue'
  import HeroBlock from './components/ui/HeroBlock.vue'

  import { IconAlertCircle } from '@tabler/icons-vue'

  import { useStore } from './store'
  import { setTheme } from './utils/theme'

  window.SimpleZoom = SimpleZoom

  const store = useStore()

  const loadSettings = async () => {
    const settings = {
      displayLanguage: localStorage.getItem('jls_displayLanguage') || 'en',
      paletteModel: localStorage.getItem('jls_paletteModel') || 'balanced',
      hue: localStorage.getItem('jls_hue')
        ? parseInt(localStorage.getItem('jls_hue'))
        : 200,
      sat: localStorage.getItem('jls_sat')
        ? parseInt(localStorage.getItem('jls_sat'))
        : 50,
      lux: localStorage.getItem('jls_lux')
        ? parseInt(localStorage.getItem('jls_lux'))
        : 25,
    }

    store.setSettings(settings)

    setTheme()
  }

  store.$subscribe((mutation, state) => {
    const appearanceChanged = ['paletteModel', 'hue', 'sat', 'lux'].includes(
      mutation.events.key,
    )

    if (appearanceChanged) setTheme()
  })

  const init = async () => {
    await Promise.all([loadSettings()])
  }

  init()
</script>

<style lang="scss">
  @import 'style/app';
</style>
