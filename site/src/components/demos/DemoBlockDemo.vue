<template>
  <h3>{{ $t('catZoom') }}</h3>
  <ol>
    <li>{{ $t('editCodeOptional') }}</li>
    <li>{{ $t('clickRun') }}</li>
    <li>{{ $t('seeWhatHappens') }}</li>
  </ol>

  <figure class="cat" :style="'background-image: url(' + url + ')'">
    <img
      :src="url"
      alt="A photo of a cat by Kelvin Valerio from Pexels"
      title="Photo by Kelvin Valerio from Pexels"
      loading="lazy"
    />
  </figure>
</template>

<script setup>
  import { onMounted, onUpdated, computed } from 'vue'
  import { useI18n } from 'vue-i18n'

  const { t, locale, messages } = useI18n()

  const code = computed(() => {
    return `const catZoom = new SimpleZoom('.cat', {
  hoverScale: '200%', // ${t('magnifyTo2XOnHover')}
  clickScale: '800%' // ${t('magnifyTo8XOnMousedown')}
  // clickScale: '1000px' // ${t('canBeAbsoluteSize')}
})
console.log(catZoom) // ${t('openDevTools')}`
  })

  const emit = defineEmits(['demo-loaded'])

  const url =
    'https://images.pexels.com/photos/617278/pexels-photo-617278.jpeg?auto=compress&w=1600'

  onMounted(() => {
    emit('demo-loaded', code.value)
  })

  onUpdated(() => {
    // eg. on language change
    emit('demo-loaded', code.value)
  })
</script>

<style scoped>
  figure {
    transition: background-size 0.1s;
    background-position: 50% 50%;
    position: relative;
    width: 200px;
    overflow: hidden;
    user-select: none;

    img {
      transition: opacity 0.5s;
      width: 100%;
    }
  }

  .active {
    cursor: zoom-in;
    border-radius: 10px;

    &::before {
      content: '';
      z-index: 1;
      position: absolute;
      width: 100%;
      height: 100%;
      background: radial-gradient(
        circle,
        rgba(0, 0, 0, 0.75),
        transparent 40px
      );
    }

    &::after {
      content: '';
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      background-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbDpzcGFjZT0icHJlc2VydmUiIGZpbGw9IiNmZmYiIHZpZXdCb3g9IjAgMCA0OTAuNCA0OTAuNCI+PHBhdGggZD0iTTQ4NC4xIDQ1NC44IDM3My42IDM0NC4yYTIxMC42IDIxMC42IDAgMSAwLTI5LjIgMjkuMmwxMTAuNSAxMTAuNWMxMi45IDExLjggMjUgNC4yIDI5LjIgMGEyMCAyMCAwIDAgMCAwLTI5LjF6bS00NDMtMjQ0YTE2OS41IDE2OS41IDAgMSAxIDMzOSAwIDE2OS41IDE2OS41IDAgMCAxLTMzOSAweiIvPjwvc3ZnPg==');
      background-size: 20px;
      background-repeat: no-repeat;
      background-position: 50% 50%;
      z-index: 2;
    }

    &:hover {
      &::before,
      &::after {
        background: none;
      }

      img {
        opacity: 0;
      }
    }
  }
</style>
