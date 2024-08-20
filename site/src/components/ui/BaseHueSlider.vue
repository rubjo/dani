<template>
  <label class="label flex w-full justify-content-between">
    <IconColorFilter />
    <span class="flex-1">{{ $t('baseHue') }}</span>
    <IconHelp v-tooltip="$t('baseHueExplainer')" />
  </label>
  <div class="pb-1">
    <small>{{ hueName }}</small>
  </div>
  <div class="px-2 mt-2">
    <PSlider ref="slider" v-model="hue" :max="359" @change="onHueChange" />
  </div>
</template>

<script setup>
  import { computed, onMounted, onUpdated, ref, watch } from 'vue'

  import { useStore } from '../../store'

  import PSlider from 'primevue/slider'

  import { IconHelp, IconColorFilter } from '@tabler/icons-vue'

  import colorNamer from 'color-namer'

  import { luminanceFromHue } from '../../utils/colour-functions'

  const slider = ref(null)

  const store = useStore()

  const hue = ref(store.hue)

  watch(
    () => store.hue,
    () => {
      hue.value = store.hue
    },
  )

  const hueName = computed(() => {
    const matches = colorNamer(`hsl(${hue.value},100%,50%)`, { pick: ['ntc'] })
    return matches.ntc[0].name
  })

  const updateKnob = () => {
    const handle = slider.value.$el.querySelector('.p-slider-handle')
    handle.style.backgroundColor = `hsl(${hue.value}, 100%, 50%)`
    handle.style.color = luminanceFromHue(hue.value) < 0.4 ? '#fff' : '#000'
    handle.style.textShadow =
      luminanceFromHue(hue.value) < 0.4
        ? '0 0 1px #000,  0 0 2px #000'
        : '0 0 1px #fff,  0 0 2px #fff'
    handle.innerHTML = `<span class="value">${hue.value}</span>`
  }

  onMounted(updateKnob)

  onUpdated(updateKnob)

  const onHueChange = () => {
    store.saveSetting({ hue: hue.value })
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
