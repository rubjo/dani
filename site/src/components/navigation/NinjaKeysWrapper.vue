<!-- eslint-disable vue/attribute-hyphenation -->
<template>
  <ninja-keys
    class="ninja-keys"
    :placeholder="t('pressAShortcutOrTypeToSearch') + '...'"
    openHotkey="cmd+k"
    :class="store.theme"
    hideBreadcrumbs
  >
    <!-- eslint-disable-next-line vue/no-deprecated-slot-attribute -->
    <div slot="footer" class="modal-footer">
      <span class="help">
        <kbd>{{ t('enter') }}</kbd>
        {{ t('toSelect') }}
      </span>
      <span class="help">
        <kbd><IconArrowUp style="height: 1rem" /></kbd>
        <kbd><IconArrowDown style="height: 1rem" /></kbd>
        {{ t('toGoUpDown') }}
      </span>
      <span class="help">
        <kbd>esc</kbd>
        {{ t('toCancel') }}
      </span>
      <span class="help">
        <kbd><IconBackspace style="height: 1rem" /></kbd>
        {{ t('toGoUpOneLevel') }}
      </span>
    </div>
  </ninja-keys>
</template>

<script setup>
  import { useStore } from '../../store'
  import { onMounted, watch, computed } from 'vue'
  import { useRouter } from 'vue-router'
  import { useI18n } from 'vue-i18n'
  import { storeToRefs } from 'pinia'

  import { setI18nLanguage } from '../../i18n'

  import { IconArrowDown, IconArrowUp, IconBackspace } from '@tabler/icons-vue'

  const store = useStore()
  const router = useRouter()

  const { t, locale } = useI18n()

  const { displayLanguage } = storeToRefs(store)

  const localeIsLoaded = computed(() => {
    return locale.value === displayLanguage.value
  })

  const setNinjaKeysLanguage = () => {
    if (window.ninja) {
      window.ninja.data = [
        {
          id: 'intro',
          title: t('introduction'),
          hotkey: 'alt+1',
          section: t('navigation'),
          handler: () => {
            router.push('/')
          },
        },
        {
          id: 'install',
          title: t('install'),
          hotkey: 'alt+2',
          section: t('navigation'),
          handler: () => {
            router.push('/install')
          },
        },
        {
          id: 'options',
          title: t('options'),
          hotkey: 'alt+3',
          section: t('navigation'),
          handler: () => {
            router.push('/options')
          },
        },
        {
          id: 'methods',
          title: t('methods'),
          hotkey: 'alt+4',
          section: t('navigation'),
          handler: () => {
            router.push('/methods')
          },
        },
        {
          id: 'examples',
          title: t('examples'),
          hotkey: 'alt+5',
          section: t('navigation'),
          handler: () => {
            router.push('/examples')
          },
        },
        {
          id: 'about',
          title: t('about'),
          hotkey: 'alt+6',
          section: t('navigation'),
          handler: () => {
            router.push('/about')
          },
        },
        {
          id: 'test',
          title: t('aTestSection'),
          children: ['randomTheme', 'setEnglish', 'setNorwegian'],
          section: t('test'),
          hotkey: 'alt+T',
          handler: () => {
            // open menu if closed. Because you can open directly that menu from its hotkey
            ninja.open({ parent: 'test' })
            // if menu opened this prevents it from closing on select that action, no need if you don't have child actions
            return { keepOpen: true }
          },
        },
        {
          id: 'randomTheme',
          title: t('randomTheme'),
          hotkey: 'alt+R',
          parent: 'test',
          handler: () => {
            const setTheme = (paletteModel, hue, sat, lux) => {
              document.documentElement.classList.add('theme-in-transition')

              store.saveSetting({ paletteModel })
              store.saveSetting({ hue })
              store.saveSetting({ sat })
              store.saveSetting({ lux })

              setTimeout(() => {
                document.documentElement.classList.remove('theme-in-transition')
              }, 500)
            }

            const paletteModels = ['balanced', 'neon', 'dramatic']
            const paletteModel =
              paletteModels[Math.floor(Math.random() * paletteModels.length)]

            const hue = Math.round(Math.random() * 360)

            // Avoid too muted and saturated colours
            const sat = 25 + Math.round(Math.random() * 50)

            // Avoid middle values for brightness and too low contrast
            const diff = 65 - 35
            let lux = Math.round(Math.random() * (100 - diff))
            if (lux >= 35) lux += diff

            setTheme(paletteModel, hue, sat, lux)

            return { keepOpen: true }
          },
        },
        {
          id: 'setEnglish',
          title: 'Set language to English',
          hotkey: 'alt+E',
          parent: 'test',
          handler: () => {
            store.saveSetting({
              displayLanguage: 'en',
            })
            setI18nLanguage('en')
          },
        },
        {
          id: 'setNorwegian',
          title: 'Sett språk til norsk',
          hotkey: 'alt+N',
          parent: 'test',
          handler: () => {
            store.saveSetting({
              displayLanguage: 'nb',
            })
            setI18nLanguage('nb')
          },
        },
      ]
    }
  }

  // There must be a simpler way of doing this
  watch(
    localeIsLoaded,
    () => {
      setNinjaKeysLanguage()
    },
    { immediate: true },
  )

  onMounted(() => {
    // Testing a command palette using ninja-keys
    window.ninja = document.querySelector('ninja-keys')
  })
</script>

<style lang="scss" scoped>
  .ninja-keys {
    position: absolute;
    z-index: 99999;

    --ninja-font-family: 'Jost';
    --ninja-font-size: 24px;
    --ninja-text-color: var(--text-primary);
    --ninja-selected-background: rgba(150, 150, 150, 0.1);
    --ninja-overflow-background: rgba(0, 0, 0, 0.25);
    --ninja-backdrop-filter: blur(20px);
    --ninja-modal-background: var(--bg-primary);
    --ninja-footer-background: rgba(150, 150, 150, 0.1);
    --ninja-secondary-background-color: rgba(150, 150, 150, 0.25);
    --ninja-secondary-text-color: var(--high-contrast);
    --ninja-actions-height: 50vh;

    &::part(ninja-input) {
      font-family: var(--ninja-font-family);
    }

    &::part(actions-list) {
      text-transform: uppercase;
    }

    &::part(ninja-action) {
      text-transform: none;
      padding: 0.5rem 2rem;
    }
  }

  .help {
    display: flex;
    align-items: center;
  }

  kbd {
    background: var(--ninja-secondary-background-color);
    padding: 0.06em 0.25em;
    border-radius: var(--ninja-key-border-radius);
    color: var(--ninja-secondary-text-color);
    margin-right: 0.25em;
  }

  .modal-footer {
    font-size: 14px;
    background: var(--ninja-footer-background);
    padding: 0.5em 1em;
    display: flex;
    justify-content: space-between;
    width: 100%;
    border-top: var(--ninja-separate-border);
    color: var(--ninja-secondary-text-color);
  }
</style>
