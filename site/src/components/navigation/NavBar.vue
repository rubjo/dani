<template>
  <bs-navbar ref="navBar" class="navbar">
    <template #start>
      <transition name="fade">
        <div v-if="isOnTop">
          <router-link to="/" custom>
            <h2 class="m-0 text-white">My JS Lib</h2>
          </router-link>
        </div>
      </transition>
    </template>

    <template #end>
      <div class="appearance-controls" :class="{ opaque: isOnTop }">
        <p-button class="p-button mr-1 py-1" @click="invokeNinjaKeys">
          <IconSearch class="md:hidden" />
          <span class="hidden md:flex">
            <kbd class="inline-flex align-items-center">
              <IconCommand v-if="os === 'macOS'" />
              <IconBrandWindows v-if="os === 'Windows'" />
              <span class="mx-1">+</span>
              <span class="activator-key">K</span>
            </kbd>
            <span class="ml-2">{{ $t('toSearch') }}</span>
          </span>
        </p-button>

        <p-button class="p-button py-1" @click.stop="toggleAppearanceMenu">
          <IconSettings />
          <span class="hidden md:inline">{{ $t('languageAndTheme') }}</span>
          <IconChevronUp v-if="profileMenu?.visible" />
          <IconChevronDown v-else />
        </p-button>

        <p-popover ref="profileMenu" style="width: 290px; z-index: 2">
          <label class="label flex">
            <IconLanguage />
            {{ $t('language') }}
          </label>
          <div class="mb-2">
            <p-button
              class="p-button p-button-sm w-full"
              @click.stop="languageMenu.toggle($event)"
            >
              <span class="flex-1 text-left pl-2">
                <span v-if="displayLanguage === 'en'">English</span>
                <span v-if="displayLanguage === 'nb'">Norsk</span>
              </span>
              <IconChevronUp v-if="languageMenu?.visible" />
              <IconChevronDown v-else />
            </p-button>
            <p-popover ref="languageMenu" class="p-0" style="z-index: 1002">
              <div class="-mx-2">
                <div
                  class="hover:bg-white-alpha-10 cursor-pointer p-2 px-3 -mx-1"
                  @click="displayLanguage = 'en'"
                >
                  English
                </div>
                <div
                  class="hover:bg-white-alpha-10 cursor-pointer p-2 px-3 -mx-1"
                  @click="displayLanguage = 'nb'"
                >
                  Norsk
                </div>
              </div>
            </p-popover>
          </div>
          <div class="my-2">
            <ThemeSelector />
          </div>
          <div v-if="showAdvancedControls" class="mb-2">
            <div class="my-2">
              <PaletteModelSelector />
            </div>
            <div class="mt-2 mb-3">
              <BaseHueSlider />
            </div>
            <div class="mt-2 mb-3">
              <SaturationSlider />
            </div>
            <div class="my-2 pb-3">
              <BrightnessSlider />
            </div>
          </div>
          <div
            class="cursor-pointer"
            @click="showAdvancedControls = !showAdvancedControls"
          >
            <small v-if="showAdvancedControls" class="flex align-items-center">
              <IconChevronUp />
              <span class="ml-1">{{ $t('hideAdvancedControls') }}</span>
            </small>
            <small v-else class="flex align-items-center">
              <IconChevronDown />
              <span class="ml-1">{{ $t('showAdvancedControls') }}</span>
            </small>
          </div>
        </p-popover>
      </div>
    </template>
  </bs-navbar>
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
  import { computed, onMounted, ref } from 'vue'

  import { debounce } from '../../utils'

  import { useStore } from '../../store'

  import PButton from 'primevue/button'
  import PPopover from 'primevue/popover'
  import BsNavbar from 'primevue/toolbar'

  import {
    IconSettings,
    IconChevronUp,
    IconChevronDown,
    IconCommand,
    IconSearch,
    IconLanguage,
    IconBrandWindows,
  } from '@tabler/icons-vue'

  import { setI18nLanguage } from '../../i18n'

  import PaletteModelSelector from '../ui/PaletteModelSelector.vue'
  import BaseHueSlider from '../ui/BaseHueSlider.vue'
  import SaturationSlider from '../ui/SaturationSlider.vue'
  import BrightnessSlider from '../ui/BrightnessSlider.vue'
  import ThemeSelector from '../ui/ThemeSelector.vue'

  const store = useStore()

  const navBar = ref(null)

  const isOnTop = ref(false)

  const showAdvancedControls = ref(false)

  const onScroll = debounce(() => {
    isOnTop.value = navBar.value?.$el?.getBoundingClientRect().top === 0
  }, 100)

  let os = undefined
  if (navigator.userAgent.indexOf('Win') != -1) os = 'Windows'
  if (navigator.userAgent.indexOf('Mac') != -1) os = 'macOS'
  if (navigator.userAgent.indexOf('X11') != -1) os = 'UNIX'
  if (navigator.userAgent.indexOf('Linux') != -1) os = 'Linux'

  const displayLanguage = computed({
    get() {
      return store.displayLanguage
    },
    async set(newValue) {
      store.saveSetting({
        displayLanguage: newValue,
      })
      await setI18nLanguage(newValue)
    },
  })

  const profileMenu = ref(null)
  const languageMenu = ref(null)

  const toggleAppearanceMenu = (event) => {
    profileMenu.value.toggle(event)
  }

  const invokeNinjaKeys = () => {
    window.ninja.open()
  }

  onMounted(() => {
    document.addEventListener('scroll', onScroll)
  })
</script>

<style lang="scss" scoped>
  .navbar {
    height: 3rem;
    padding: 0 1rem;
    border-radius: 0;
    background: transparent;
    border: 0;
    position: sticky;
    top: 0;
    margin-top: -3rem;
    z-index: 2;
    overflow: hidden;

    .p-button {
      background: rgba(0, 0, 0, 0.1);
      color: #fff;
      border: 0;
      transition: background 1s ease;
      height: 44px;
      box-shadow: none !important;

      &:enabled:hover {
        background: rgba(0, 0, 0, 0.25);
      }
    }
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 1s ease;
  }

  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
    transition-duration: 0.1s;
  }

  .appearance-controls {
    opacity: 0.4;
    transition: opacity 1s ease;

    &:hover {
      opacity: 1;
    }

    &.opaque {
      opacity: 1;
    }
  }
</style>
