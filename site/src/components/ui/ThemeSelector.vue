<template>
  <label class="label w-full">
    <IconBrush />
    <span class="flex flex-1 align-items-center">
      {{ $t('theme') }}
      <p-button
        v-tooltip.top="$t('shuffleTheme')"
        class="random ml-1 justify-content-center flex-0"
      >
        <component :is="DiceComponent" @click="setRandomTheme" />
      </p-button>
    </span>
    <IconHelp v-tooltip="$t('themeExplainer')" />
  </label>
  <p-button
    class="w-full p-button p-button-sm"
    @click.stop="themeMenu?.toggle($event)"
  >
    <span class="flex-1 text-left pl-2">
      <span v-if="theme === 'spaceGlow'">Space Glow</span>
      <span v-else-if="theme === 'vampire'">Vampire</span>
      <span v-else-if="theme === 'ultimateDark'">Ultimate Dark</span>
      <span v-else-if="theme === 'candyStore'">Candy Store</span>
      <span v-else-if="theme === 'tranquilTurqouise'">Tranquil Turqouise</span>
      <span v-else-if="theme === 'zenForest'">Zen Forest</span>
      <span v-else-if="theme === 'caramel'">Caramel</span>
      <span v-else-if="theme === 'vanilla'">Vanilla</span>
      <span v-else>{{ $t('custom') }}</span>
    </span>
    <IconChevronUp v-if="themeMenu?.visible" />
    <IconChevronDown v-else />
  </p-button>
  <p-popover ref="themeMenu" style="z-index: 1002">
    <div class="-mx-2">
      <div
        class="hover:bg-white-alpha-10 cursor-pointer p-2 px-3 -mx-1 flex align-items-center"
        @click="setTheme('neon', 249, 72, 14)"
      >
        <IconMoon />
        <span class="ml-1">Space Glow</span>
      </div>
      <div
        class="hover:bg-white-alpha-10 cursor-pointer p-2 px-3 -mx-1 flex align-items-center"
        @click="setTheme('dramatic', 325, 59, 13)"
      >
        <IconMoon />
        <span class="ml-1">Vampire</span>
      </div>
      <div
        class="hover:bg-white-alpha-10 cursor-pointer p-2 px-3 -mx-1 flex align-items-center"
        @click="setTheme('balanced', 200, 65, 26)"
      >
        <IconMoon />
        <span class="ml-1">Ultimate Dark</span>
      </div>
      <div
        class="hover:bg-white-alpha-10 cursor-pointer p-2 px-3 -mx-1 flex align-items-center"
        @click="setTheme('dramatic', 35, 69, 25)"
      >
        <IconMoon />
        <span class="ml-1">Candy Store</span>
      </div>
      <div
        class="hover:bg-white-alpha-10 cursor-pointer p-2 px-3 -mx-1 flex align-items-center"
        @click="setTheme('neon', 113, 0, 74)"
      >
        <IconSun />
        <span class="ml-1">Zen Forest</span>
      </div>
      <div
        class="hover:bg-white-alpha-10 cursor-pointer p-2 px-3 -mx-1 flex align-items-center"
        @click="setTheme('neon', 187, 33, 74)"
      >
        <IconSun />
        <span class="ml-1">Tranquil Turqouise</span>
      </div>
      <div
        class="hover:bg-white-alpha-10 cursor-pointer p-2 px-3 -mx-1 flex align-items-center"
        @click="setTheme('balanced', 28, 90, 82)"
      >
        <IconSun />
        <span class="ml-1">Caramel</span>
      </div>
      <div
        class="hover:bg-white-alpha-10 cursor-pointer p-2 px-3 -mx-1 flex align-items-center"
        @click="setTheme('balanced', 28, 0, 95)"
      >
        <IconSun />
        <span class="ml-1">Vanilla</span>
      </div>
      <hr class="opacity-30" />
      <div
        class="hover:bg-white-alpha-10 cursor-pointer p-2 px-3 -mx-1 flex align-items-center"
        @click="setRandomTheme"
      >
        <component :is="DiceComponent" @click="setRandomTheme" />
        <span class="ml-1">{{ $t('random') }}</span>
      </div>
    </div>
  </p-popover>
</template>

<script setup>
  import { computed, ref } from 'vue'

  import PButton from 'primevue/button'
  import PPopover from 'primevue/popover'

  import {
    IconDice1,
    IconDice2,
    IconDice3,
    IconDice4,
    IconDice5,
    IconDice6,
    IconBrush,
    IconHelp,
    IconMoon,
    IconSun,
    IconChevronUp,
    IconChevronDown,
  } from '@tabler/icons-vue'

  import { useStore } from '../../store'

  const store = useStore()

  const themeMenu = ref(null)

  const currentDie = ref(Math.floor(Math.random() * 6))
  const DiceComponent = computed(() => {
    const dice = [
      IconDice1,
      IconDice2,
      IconDice3,
      IconDice4,
      IconDice5,
      IconDice6,
    ]
    return dice[currentDie.value]
  })

  const theme = computed(() => {
    if (
      store.paletteModel === 'balanced' &&
      store.hue === 200 &&
      store.sat === 65 &&
      store.lux === 26
    ) {
      return 'ultimateDark'
    }

    if (
      store.paletteModel === 'neon' &&
      store.hue === 249 &&
      store.sat === 72 &&
      store.lux === 14
    ) {
      return 'spaceGlow'
    }

    if (
      store.paletteModel === 'dramatic' &&
      store.hue === 325 &&
      store.sat === 59 &&
      store.lux === 13
    ) {
      return 'vampire'
    }

    if (
      store.paletteModel === 'dramatic' &&
      store.hue === 35 &&
      store.sat === 69 &&
      store.lux === 25
    ) {
      return 'candyStore'
    }

    if (
      store.paletteModel === 'neon' &&
      store.hue === 113 &&
      store.sat === 0 &&
      store.lux === 74
    ) {
      return 'zenForest'
    }

    if (
      store.paletteModel === 'neon' &&
      store.hue === 187 &&
      store.sat === 33 &&
      store.lux === 74
    ) {
      return 'tranquilTurqouise'
    }

    if (
      store.paletteModel === 'balanced' &&
      store.hue === 28 &&
      store.sat === 90 &&
      store.lux === 82
    ) {
      return 'caramel'
    }

    if (
      store.paletteModel === 'balanced' &&
      store.hue === 28 &&
      store.sat === 0 &&
      store.lux === 95
    ) {
      return 'vanilla'
    }

    return 'custom'
  })

  const setRandomTheme = () => {
    currentDie.value = Math.floor(Math.random() * 6)
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
  }

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
</script>

<style scoped lang="scss">
  .random {
    width: 1rem;
    height: 1rem;
    padding: 0.1rem;
  }
</style>
