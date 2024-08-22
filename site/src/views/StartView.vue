<template>
  <div>
    <Message severity="secondary" closable class="mt-3">
      <h3 class="m-0">{{ $t('whatsThis?') }}</h3>
      {{ $t('siteDescription') }}
      <a href="https://github.com/rubjo/dani"> {{ $t('theGithubRepo') }}</a
      >. ❤️
    </Message>

    <h2>{{ $t('anExampleLibraryHeader') }}</h2>

    <DemoBlock :demo="'DemoBlockDemo'" />

    <p>
      {{ $t('linkToOtherPages') }}
      <router-link to="/install">{{ $t('install') }}</router-link
      >, <router-link to="/options">{{ $t('options') }}</router-link
      >, <router-link to="/methods">{{ $t('methods') }}</router-link>
      {{ $t('or') }}
      <router-link to="/examples">{{ $t('examples') }}</router-link
      >.
    </p>
  </div>
</template>

<script setup>
  import Message from 'primevue/message'
  import DemoBlock from '../components/ui/DemoBlock.vue'
</script>
