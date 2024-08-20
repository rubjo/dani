<template>
  <div>
    <h2>{{ $t('examples') }}</h2>

    <p>Here's that start page demo again:</p>

    <DemoBlock :demo="'DemoBlockDemo'" />
  </div>
</template>

<script setup>
  import DemoBlock from '../components/ui/DemoBlock.vue'
</script>
