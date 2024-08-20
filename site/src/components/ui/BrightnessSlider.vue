<template>
  <label class="label flex w-full justify-content-between">
    <IconSunFilled />
    <span class="flex-1">{{ $t('brightness') }}</span>
    <IconHelp v-tooltip="$t('brightnessExplainer')" />
  </label>
  <div class="pb-1">
    <small>{{ brightnessDesc }}</small>
  </div>
  <div class="px-2 mt-2">
    <PSlider ref="slider" v-model="lux" @change="onBrightnessChange" />
  </div>
</template>

<script setup>
  import { computed, onMounted, onUpdated, ref, watch } from 'vue'

  import { useStore } from '../../store'

  import { IconHelp, IconSunFilled } from '@tabler/icons-vue'

  import PSlider from 'primevue/slider'

  const slider = ref(null)

  const store = useStore()

  const lux = ref(store.lux)

  watch(
    () => store.lux,
    () => {
      lux.value = store.lux
    },
  )

  const brightnessDesc = computed(() => {
    if (lux.value < 10) return 'Onyx'
    else if (lux.value < 20) return 'Obsidian'
    else if (lux.value < 30) return 'Anthracite'
    else if (lux.value < 40) return 'Graphite'
    else if (lux.value < 50) return 'Basalt'
    else if (lux.value < 60) return 'Limestone'
    else if (lux.value < 70) return 'Dolomite'
    else if (lux.value < 80) return 'Marble'
    else if (lux.value < 90) return 'Alabaster'
    else if (lux.value < 100) return 'Chalk'
    else return 'Titanium'
  })

  const updateKnob = () => {
    // ahem
    const handle = slider.value.$el.querySelector('.p-slider-handle')
    handle.style.backgroundColor = `hsl(0, 0%, ${lux.value}%)`
    handle.innerText = lux.value
  }

  onMounted(updateKnob)

  onUpdated(updateKnob)

  const onBrightnessChange = () => {
    store.saveSetting({ lux: lux.value })
  }
</script>

<style scoped lang="scss">
  :deep(.p-slider):not(.p-disabled) {
    .p-slider-handle {
      box-shadow:
        -2px -2px 4px rgba(255, 255, 255, 0.05),
        2px 2px 4px rgba(0, 0, 0, 0.125);
      color: var(--text-primary);
      height: 1.4rem;
      width: 1.4rem;
      font-size: 11px;
      font-weight: 500;
      margin-top: -0.7rem;
      margin-left: -0.7rem;
      display: flex;
      align-items: center;
      justify-content: center;

      &:hover {
        background: inherit;
        cursor: ew-resize;
      }
    }
  }
</style>
