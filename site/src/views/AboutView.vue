<template>
  <div>
    <h2>About</h2>

    <Message severity="secondary" closable class="mt-3">
      <h3 class="m-0">{{ $t('whatsThis?') }}</h3>
      {{ $t('siteDescription') }}
      <a href="https://github.com/rubjo/dani"> {{ $t('theGithubRepo') }}</a
      >. ❤️
    </Message>
  </div>
</template>

<script setup>
  import Message from 'primevue/message'
</script>
