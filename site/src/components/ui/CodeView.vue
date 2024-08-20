<template>
  <div class="code-container">
    <codemirror
      :model-value="modelValue"
      :autofocus="true"
      :indent-with-tab="true"
      :tab-size="2"
      :extensions="extensions"
      @update:model-value="emit('update:modelValue', $event)"
    />
  </div>
</template>
<script setup>
  import { codeThemes } from '../../style/code-themes.js'
  import { javascript } from '@codemirror/lang-javascript'
  import { Codemirror } from 'vue-codemirror'

  const props = defineProps({
    modelValue: {
      type: String,
      default: '',
    },
  })

  const emit = defineEmits(['update:modelValue'])

  const extensions = [javascript(), codeThemes]
</script>

<style scoped lang="scss">
  .code-container {
    background: var(--code-bg-primary);

    :deep(.cm-editor) {
      border: 0;
      padding: 0.25rem;

      /* Foreground, Background */
      scrollbar-color: var(--ui-overlay) var(--code-bg-primary);

      &.cm-focused {
        outline: none;
      }

      // .cm-gutters {
      //   z-index: 0;
      // }
      .cm-content {
        padding: 0;
      }

      .cm-line {
        padding: 5px 15px;
      }

      .cm-gutterElement {
        position: relative;
        opacity: 0.6;
      }

      .cm-gutterElement:not(.cm-activeLineGutter) {
        opacity: 0.4;
      }

      span[title='Unfold line'] {
        top: 5px;
      }
    }

    :deep(.cm-scroller) {
      &::-webkit-scrollbar {
        width: 10px; /* Mostly for vertical scrollbars */
        height: 10px; /* Mostly for horizontal scrollbars */
      }

      &::-webkit-scrollbar-thumb {
        /* Foreground */
        background: var(--ui-overlay);
      }

      &::-webkit-scrollbar-track {
        /* Background */
        background: var(--code-bg-primary);
      }
    }
  }
</style>
