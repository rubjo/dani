<template>
  <div>
    <h2>{{ $t('install') }}</h2>

    <p>
      {{ $t('addSomeInstructionsAnd') }}
      <code>{{ $t('commands').toLowerCase() }}</code> {{ $t('here') }}.
    </p>
  </div>
</template>

<script setup>
  import { onMounted } from 'vue'

  onMounted(() => {})
</script>
