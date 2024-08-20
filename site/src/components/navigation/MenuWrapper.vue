<!--
  This component:
    - imports/contains the menu entries
    - checks viewport width to determine which menu component
      to use: mobile or desktop menu
-->

<template>
  <div class="main-menu">
    <component :is="menuComponentType" :menu="menu" />
  </div>
</template>

<script setup>
  import { shallowRef, computed, onMounted, defineAsyncComponent } from 'vue'

  import { useI18n } from 'vue-i18n'

  import {
    IconHome,
    IconBook,
    IconBolt,
    IconAdjustmentsHorizontal,
    IconWand,
    IconBulb,
    IconHelp,
  } from '@tabler/icons-vue'

  import { useStore } from '../../store'
  import { debounce } from '../../utils'

  const { t } = useI18n()

  const MobileMenu = defineAsyncComponent(() => import('./MobileMenu.vue'))

  const DesktopTabletMenu = defineAsyncComponent(
    () => import('./DesktopTabletMenu.vue'),
  )

  const store = useStore()

  const menu = computed(() => {
    return [
      {
        href: '/',
        title: t('introduction'),
        shortTitle: 'Intro',
        icon: { element: IconHome },
      },
      {
        title: t('documentation'),
        shortTitle: 'Docs',
        href: '',
        icon: { element: IconBook },
        child: [
          {
            href: 'install',
            title: t('install'),
            icon: { element: IconBolt },
          },
          {
            href: 'options',
            title: t('options'),
            icon: { element: IconAdjustmentsHorizontal },
          },
          {
            href: 'methods',
            title: t('methods'),
            icon: { element: IconWand },
          },
        ],
      },
      {
        href: 'examples',
        title: t('examples'),
        icon: { element: IconBulb },
      },
      {
        href: 'about',
        title: t('about'),
        icon: { element: IconHelp },
      },
    ]
  })

  const menuComponentType = shallowRef(null)

  const setMenuComponentType = () => {
    menuComponentType.value =
      window.innerWidth <= 768 ? MobileMenu : DesktopTabletMenu
  }

  onMounted(() => {
    setMenuComponentType()
    window.addEventListener('resize', debounce(setMenuComponentType, 50))
  })
</script>

<style>
  .main-menu {
    position: sticky;
    top: 3rem;
    z-index: 2;
  }
</style>
