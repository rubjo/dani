<template>
  <div v-show="originalCode" class="block-container">
    <div ref="demoComponent" @click="onDemoComponentClick">
      <DemoComponent @demo-loaded="onDemoLoaded" />
    </div>

    <CodeView v-model="code" class="mt-1" />

    <div class="buttons mt-1 mb-4">
      <p-button
        v-tooltip.bottom="
          running ? t('stopTheCodeAbove') : t('runTheCodeAbove')
        "
        class="run-button p-button-primary p-button-sm pl-1 pr-2 py-0 mr-1"
        :class="{ 'p-button-running': running }"
        @click="running ? stopInstance() : runCode()"
      >
        <div class="bg" />
        <IconPlayerPause v-if="running" />
        <IconPlayerPlay v-else />
        <span v-if="running" class="p-button-label">{{ $t('stop') }}</span>
        <span v-else class="p-button-label">{{ $t('run') }}</span>
      </p-button>
      <p-button
        v-tooltip.bottom="t('copyTheCodeAbove')"
        class="copy-button p-button-sm pl-1 pr-2 py-0 mr-1"
        :class="{ 'p-button-success': copied }"
        @click="copyCode"
      >
        <IconClipboardCheck v-if="copied" />
        <IconClipboard v-else />
        <span v-if="copied" class="p-button-label">{{ $t('copied') }}</span>
        <span v-else class="p-button-label">{{ $t('copy') }}</span>
      </p-button>
      <Transition>
        <p-button
          v-if="modified"
          v-tooltip.bottom="t('resetTheCodeAbove')"
          class="reset-button p-button-sm pl-1 pr-2 py-0"
          @click="reset"
        >
          <IconRestore />
          {{ $t('reset') }}
        </p-button>
      </Transition>
    </div>
  </div>
</template>

<script setup>
  import { ref, defineAsyncComponent, computed, watch } from 'vue'

  import CodeView from '../ui/CodeView.vue'

  import {
    IconPlayerPause,
    IconPlayerPlay,
    IconClipboardCheck,
    IconClipboard,
    IconRestore,
  } from '@tabler/icons-vue'

  import PButton from 'primevue/button'

  // Can also use Babel here if one wants to
  // import transpile from '@/utils/transpile'

  import { useToast } from 'primevue/usetoast'

  import { useI18n } from 'vue-i18n'

  const toast = useToast()

  const { t } = useI18n()

  const props = defineProps({
    demo: {
      type: String,
      default: '',
    },
  })

  const DemoComponent = defineAsyncComponent(
    () => import(/* @vite-ignore */ '../demos/' + props.demo + '.vue'),
  )

  const originalCode = ref('')
  const code = ref('')
  const copied = ref(false)
  const running = ref(false)

  const modified = computed(() => {
    return code.value !== originalCode.value
  })

  watch(code, (val) => {
    if (running.value)
      stopInstance('destroyedAfterCodeChangeSuccessHeader', 'warn')
  })

  const demoComponent = ref(null)

  const onDemoLoaded = (demoCode) => {
    originalCode.value = demoCode
    code.value = demoCode
  }

  const getInstance = () => {
    const allElements = demoComponent.value.querySelectorAll('*')
    for (const element of allElements) {
      if (element.simpleZoom) {
        return element.simpleZoom
      }
    }

    return false
  }

  const runCode = () => {
    try {
      // Function(transpile(code.value))()
      Function(code.value)()
      running.value = true

      const hideNotification = localStorage.getItem(
        'jls_notifications_initialised_hidden',
      )

      if (hideNotification) return

      const instance = getInstance()

      if (instance) {
        toast.add({
          severity: 'success',
          summary: t('initialisedSuccessHeader'),
          detail: t('initialisedSuccessContent'),
          life: 5000,
          confirmText: t('dontShowAgain'),
          onConfirm: () => {
            localStorage.setItem('jls_notifications_initialised_hidden', true)
            toast.remove()
          },
        })
      }
    } catch (error) {
      toast.add({
        severity: 'error',
        summary: t('initialisedErrorHeader'),
        detail:
          t('initialisedErrorContent') +
          ': "' +
          error +
          '".\n\n' +
          t('initialisedErrorContentEnd'),
        life: 10000,
      })
      console.error(error)
    }
  }

  const stopInstance = (msg, severity) => {
    // Destroy instance if it has been initialised
    let instance = getInstance()

    running.value = false

    if (instance) {
      instance.destroy()
      instance = null

      const hideNotification = localStorage.getItem('jls_notifications_' + msg)

      if (hideNotification) return

      if (msg && severity) {
        toast.add({
          severity,
          summary: t(msg),
          life: 5000,
          confirmText: t('dontShowAgain'),
          onConfirm: () => {
            localStorage.setItem('jls_notifications_' + msg, true)
            toast.remove()
          },
        })
      }
    }
  }

  const reset = () => {
    code.value = originalCode.value
  }

  const copyCode = () => {
    navigator.clipboard.writeText(code.value).then(
      function () {
        copied.value = true
        setTimeout(() => {
          copied.value = false
        }, 1000)
      },
      function (err) {
        copyButtonLabel.value = t('couldNotCopyText')
      },
    )
  }

  const highlightRunButton = () => {
    const runButton =
      demoComponent.value.parentNode.querySelector('.run-button')
    runButton.classList.add('jump')
    setTimeout(() => {
      runButton.classList.remove('jump')
    }, 500)
  }

  const onDemoComponentClick = (e) => {
    if (e.target.tagName === 'IMG' && !running.value) {
      highlightRunButton()
    }
  }
</script>

<style lang="scss" scoped>
  .block-container {
    position: relative;
  }

  .buttons {
    perspective: 1000;
  }

  .run-button {
    z-index: 1;

    .bg {
      position: absolute;
      inset: 0 0 0 -46px;
      z-index: 1;
      opacity: 0;
      transition: opacity 1s;
    }

    &.p-button-running {
      background: var(--success) !important;
      border-color: var(--success) !important;
      transition: background 0.5s;

      .bg {
        opacity: 1;
        background: repeating-linear-gradient(
          -55deg,
          rgba(0, 0, 0, 0.025) 1px,
          rgba(255, 255, 255, 0.025) 2px,
          rgba(255, 255, 255, 0.025) 11px,
          rgba(0, 0, 0, 0.025) 12px,
          rgba(0, 0, 0, 0.025) 20px
        );
        animation-name: move-bg;
        animation-duration: 2s;
        animation-timing-function: linear;
        animation-iteration-count: infinite;
      }

      span {
        z-index: 2;
      }
    }

    &.jump {
      animation-name: jump;
      animation-duration: 0.5s;
    }
  }

  .copy-button {
    z-index: 1;
  }

  @keyframes move-bg {
    from {
      transform: translateX(0);
    }

    to {
      transform: translateX(46px);
    }
  }

  @keyframes jump {
    0% {
      transform: scale(1);
    }

    10% {
      transform: scale(1.25);
    }

    100% {
      transform: scale(1);
    }
  }

  .reset-code {
    transform: translateZ(0);
  }

  .v-enter-active,
  .v-leave-active {
    opacity: 1;
    transition: all 0.5s cubic-bezier(0, 0, 0.1, 1);
  }

  .v-enter-from,
  .v-leave-to {
    opacity: 0;
    margin-left: -100px;
    transition: none;
  }
</style>
