<template>
  <label class="label flex w-full justify-content-between">
    <IconLollipop />
    <span class="flex-1">{{ $t('saturation') }}</span>
    <IconHelp v-tooltip="$t('saturationExplainer')" />
  </label>
  <div class="pb-1">
    <small>{{ satDesc }}</small>
  </div>
  <div class="px-2 mt-2">
    <PSlider
      ref="slider"
      v-model="sat"
      :min="-50"
      :max="50"
      @change="onSaturationChange"
    />
  </div>
</template>

<script setup>
  import { computed, onMounted, onUpdated, ref, watch } from 'vue'

  import { useStore } from '../../store'

  import { IconHelp, IconLollipop } from '@tabler/icons-vue'

  import PSlider from 'primevue/slider'

  import {
    HSLToRGB,
    linearFromRGB,
    luminanceFromLin,
  } from '../../utils/colour-functions'

  const slider = ref(null)

  const store = useStore()

  const hue = ref(store.hue)

  const sat = ref(store.sat - 50)

  watch(
    () => store.hue,
    () => {
      hue.value = store.hue
      updateKnob()
    },
  )

  watch(
    () => store.sat,
    () => {
      sat.value = store.sat - 50
    },
  )

  const satDesc = computed(() => {
    if (sat.value < -30) return 'Muted'
    else if (sat.value < -10) return 'Weak'
    else if (sat.value < 10) return 'Normal'
    else if (sat.value < 30) return 'Colourful'
    else return 'Vibrant'
  })

  function luminance(hue) {
    const rgb = HSLToRGB(hue, sat.value + 50, 50)
    let lin = linearFromRGB(rgb)
    return luminanceFromLin(lin)
  }

  const updateKnob = () => {
    const handle = slider.value.$el.querySelector('.p-slider-handle')
    handle.style.backgroundColor = `hsl(${hue.value}, ${sat.value + 50}%, 50%)`
    handle.style.color = luminance(hue.value) < 0.4 ? '#fff' : '#000'
    handle.style.textShadow =
      luminance(hue.value) < 0.4
        ? '0 0 1px #000,  0 0 2px #000'
        : '0 0 1px #fff,  0 0 2px #fff'
    handle.innerHTML = `<span class="value">
      ${sat.value > 0 ? '+' : ''}${sat.value}
    </span>`
  }

  onMounted(updateKnob)

  onUpdated(updateKnob)

  const onSaturationChange = () => {
    store.saveSetting({ sat: sat.value + 50 })
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

      .value {
        position: relative;
        font-size: 11px;
        font-weight: 500;
      }
    }
  }
</style>
