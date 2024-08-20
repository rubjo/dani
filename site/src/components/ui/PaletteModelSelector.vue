<template>
  <label class="label w-full">
    <IconPalette />
    <span class="flex-1">
      {{ $t('paletteModel') }}
    </span>
    <IconHelp v-tooltip="$t('paletteModelExplainer')" />
  </label>
  <p-button
    class="p-button p-button-sm w-full"
    @click.stop="paletteModelMenu?.toggle($event)"
  >
    <span class="flex-1 text-left pl-2">
      <span v-if="paletteModel === 'balanced'">{{ $t('balanced') }}</span>
      <span v-if="paletteModel === 'neon'">{{ $t('neon') }}</span>
      <span v-if="paletteModel === 'dramatic'">{{ $t('dramatic') }}</span>
    </span>
    <IconChevronUp v-if="paletteModelMenu?.visible" />
    <IconChevronDown v-else />
  </p-button>
  <p-popover ref="paletteModelMenu" style="width: 220px; z-index: 1002">
    <div class="-mx-2">
      <div
        class="hover:bg-white-alpha-10 cursor-pointer p-2 px-3 -mx-1"
        @click="setPaletteModel('balanced')"
      >
        <div>{{ $t('balanced') }}</div>
        <small class="opacity-60">{{ $t('balancedExplainer') }}</small>
      </div>
      <div
        class="hover:bg-white-alpha-10 cursor-pointer p-2 px-3 -mx-1"
        @click="setPaletteModel('neon')"
      >
        <div>{{ $t('neon') }}</div>
        <small class="opacity-60">{{ $t('neonExplainer') }} </small>
      </div>
      <div
        class="hover:bg-white-alpha-10 cursor-pointer p-2 px-3 -mx-1"
        @click="setPaletteModel('dramatic')"
      >
        <div>{{ $t('dramatic') }}</div>
        <small class="opacity-60">{{ $t('dramaticExplainer') }} </small>
      </div>
    </div>
  </p-popover>
</template>

<script setup>
  import { ref, watch } from 'vue'

  import PButton from 'primevue/button'
  import PPopover from 'primevue/popover'

  import {
    IconPalette,
    IconHelp,
    IconChevronUp,
    IconChevronDown,
  } from '@tabler/icons-vue'

  import { useStore } from '../../store'

  const store = useStore()

  const paletteModelMenu = ref(null)

  const paletteModel = ref(store.paletteModel)

  watch(
    () => store.paletteModel,
    () => {
      paletteModel.value = store.paletteModel
    },
  )

  const setPaletteModel = (paletteModel) => {
    store.saveSetting({ paletteModel })
  }
</script>

<style scoped lang="scss"></style>
