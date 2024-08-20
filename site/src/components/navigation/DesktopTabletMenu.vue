<template>
  <sidebar-menu
    :menu="menu"
    :collapsed="isCollapsed"
    :hide-toggle="false"
    width="250px"
    @update:collapsed="onToggleCollapse"
    @item-click="onItemClick"
  >
    <template #toggle-icon>
      <IconSquareArrowRight v-if="isCollapsed" />
      <IconSquareArrowLeft v-else />
    </template>
    <template #dropdown-icon>
      <IconChevronRight />
    </template>
  </sidebar-menu>
</template>

<script setup>
  import { ref, onMounted, onUnmounted } from 'vue'

  import {
    IconSquareArrowRight,
    IconSquareArrowLeft,
    IconChevronRight,
  } from '@tabler/icons-vue'

  import { SidebarMenu } from 'vue-sidebar-menu'
  import { debounce } from '../../utils'

  defineProps({
    menu: {
      type: Array,
      required: true,
    },
  })

  const isCollapsed = ref(true)

  onMounted(() => {
    setCollapsedState()
    window.addEventListener('resize', setCollapsedState)
  })

  onUnmounted(() => {
    window.removeEventListener('resize', setCollapsedState)
  })

  const onItemClick = (_event, item, _node) => {
    if (item.action) {
      item.action()
    }
  }

  const setCollapsedState = () => {
    const content = document.querySelector('.content')

    const isMobile = window.innerWidth <= 768
    if (isMobile) {
      content.classList.remove('desktop')
      content.classList.remove('collapsed')
      return
    }

    isCollapsed.value = window.innerWidth <= 1280

    setContentClass()
  }

  const onToggleCollapse = () => {
    isCollapsed.value = !isCollapsed.value
    setContentClass()
  }

  const setContentClass = () => {
    const content = document.querySelector('.content')
    if (isCollapsed.value) {
      content.classList.remove('desktop')
      content.classList.add('collapsed')
    } else {
      content.classList.remove('collapsed')
      content.classList.add('desktop')
    }

    content.classList.toggle('wide', window.innerWidth >= 1540)
  }
</script>

<style lang="scss">
  @import 'vue-sidebar-menu/src/scss/variables';
  @import 'vue-sidebar-menu/src/scss/base';

  .v-sidebar-menu {
    --vsm-icon-height: 1.25rem;
    --vsm-icon-width: 1.25rem;

    position: absolute;
    height: calc(100vh - 3rem);
    background-color: var(--bg-menu-primary);

    .vsm--icon {
      color: var(--text-primary);
    }

    .vsm--link {
      color: var(--text-primary);
      height: 2rem;
      font-size: unset;
      font-weight: 300;
      transition: padding 0.3s ease;

      &_exact-active,
      &_active {
        color: var(--text-primary);
        background-color: var(--bg-primary);
      }

      &_hover,
      &:hover {
        color: var(--high-contrast);
        background-color: var(--bg-menu-primary-hover);
      }
    }

    .vsm--dropdown {
      padding: 0;

      .vsm--link {
        padding-left: 2rem;
      }
    }

    .vsm--title {
      width: 225px !important;

      &_hover,
      &:hover {
        color: var(--high-contrast);
        background-color: var(--bg-menu-primary-hover);
      }
    }

    .vsm--child_mobile {
      overflow-y: hidden !important; // Please forgive me
      background-color: var(--bg-menu-primary);
      width: 225px !important;
    }

    .vsm--mobile-bg {
      background-color: var(--bg-menu-primary);
      width: 290px !important;
    }

    .vsm--badge_default {
      color: var(--text-primary);
      background-color: var(--bg-menu-secondary);
    }

    .vsm--arrow_open {
      transform: rotate(90deg);
      transition: transform 0.3s ease;
    }

    .vsm--toggle-btn {
      background: var(--bg-menu-primary);
      position: sticky;
      bottom: 0;
      z-index: 20;
      color: var(--lowest-contrast);

      svg {
        height: 1.25rem;
      }

      &:hover {
        color: var(--text-primary);
      }
    }
  }
</style>
