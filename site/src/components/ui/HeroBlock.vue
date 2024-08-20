<template>
  <div class="hero">
    <!-- main Atropos container (required), add your custom class here -->
    <div class="atropos my-atropos">
      <!-- scale container (required) -->
      <div class="atropos-scale">
        <!-- rotate container (required) -->
        <div class="atropos-rotate">
          <!-- inner container (required) -->
          <div class="atropos-inner pt-3 pb-6">
            <!-- put your custom content here -->
            <h1 class="m-0 line-height-1" style="font-size: calc(64px + 9vw)">
              Dani
            </h1>
            <h1
              class="m-0 line-height-1 pb-2"
              style="font-size: calc(16px + 3vw)"
            >
              {{ $t('showcaseYourLibrary') }}
            </h1>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { onMounted } from 'vue'

  import 'atropos/css'

  import { Atropos } from 'atropos'

  onMounted(() => {
    const myAtropos = Atropos({
      el: '.my-atropos',
      shadow: false,
    })
  })
</script>

<style lang="scss" scoped>
  .hero {
    position: sticky;
    top: calc(-108px - 12vw);
    height: calc(174px + 12vw);
    background: var(--primary-gradient);
    z-index: 1;
  }

  .my-atropos {
    overflow: hidden;
    max-height: 100%;
  }

  .atropos-inner {
    text-align: center;
  }
</style>
