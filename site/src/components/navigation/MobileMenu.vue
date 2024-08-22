<template>
  <nav class="mobile-menu flex text-center">
    <template
      v-for="entry in mobileMenuEntries"
      :key="entry.title"
      :to="entry.href"
    >
      <component
        :is="entry.href ? 'router-link' : 'div'"
        :to="entry.href"
        class="router-link col"
      >
        <div
          class="entry-wrapper"
          @mouseover="showChildren"
          @mouseout="hideChildren"
        >
          <span class="icon">
            <component :is="entry.icon.element" />
          </span>
          <span class="block">
            <span v-if="entry.localized">
              <span v-if="entry.shortTitle">
                {{ $t(entry.shortTitle) }}
              </span>
              <span v-else>
                {{ $t(entry.title) }}
              </span>
            </span>
            <span v-else>
              <span v-if="entry.shortTitle">
                {{ entry.shortTitle }}
              </span>
              <span v-else>
                {{ entry.title }}
              </span>
            </span>
          </span>
          <div
            v-if="entry.child && entry.child.length"
            class="children"
            @click="hideChildren"
          >
            <div v-for="child in entry.child" :key="child.title" class="child">
              <router-link
                v-if="child.href"
                :to="child.href"
                class="router-link col"
              >
                <span class="icon">
                  <component :is="child.icon.element" />
                </span>
                <span v-if="child.localized">
                  {{ $t(child.title) }}
                </span>
                <span v-else>
                  {{ child.title }}
                </span>
              </router-link>
              <div
                v-if="child.child && child.child.length"
                class="grand-children"
              >
                <div
                  v-for="grandChild in child.child"
                  :key="grandChild.title"
                  class="grand-child"
                >
                  <router-link
                    v-if="grandChild.href"
                    :to="grandChild.href"
                    class="router-link col"
                  >
                    <span class="icon">
                      <component :is="grandChild.icon.element" />
                    </span>
                    <span v-if="grandChild.localized">
                      {{ $t(grandChild.title) }}
                    </span>
                    <span v-else>
                      {{ grandChild.title }}
                    </span>
                  </router-link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </component>
    </template>
  </nav>
</template>

<script setup>
  //
  //                                ,,
  //    .M"""bgd                    db             mm
  //   ,MI    "Y                                   MM
  //   `MMb.      ,p6"bo `7Mb,od8 `7MM `7MMpdMAo.mmMMmm
  //     `YMMNq. 6M'  OO   MM' "'   MM   MM   `Wb  MM
  //   .     `MM 8M        MM       MM   MM    M8  MM
  //   Mb     dM YM.    ,  MM       MM   MM   ,AP  MM
  //   P"Ybmmd"   YMbmd' .JMML.   .JMML. MMbmmd'   `Mbmo
  //                                     MM
  //                                   .JMML.
  import { ref, onMounted, onUnmounted, watch } from 'vue'

  import { debounce } from '../../utils'

  const props = defineProps({
    menu: {
      type: Array,
      required: true,
    },
  })

  const mobileMenuEntries = ref([])

  watch(
    () => props.menu,
    () => {
      recalcMobileMenuEntries()
    },
  )

  onMounted(() => {
    recalcMobileMenuEntries()
    window.addEventListener('resize', debounce(recalcMobileMenuEntries, 50))
  })

  onUnmounted(() => {
    window.removeEventListener('resize', debounce(recalcMobileMenuEntries, 50))
  })

  const recalcMobileMenuEntries = () => {
    const width = window.innerWidth
    const entryMinWidth = 80
    const numberOfVisibleEntries = parseInt(width / entryMinWidth)

    // Filter out headers
    const menuWithoutHeaders = props.menu.filter((e) => !e.header)

    // No need to change original menu
    if (numberOfVisibleEntries >= menuWithoutHeaders.length) {
      mobileMenuEntries.value = menuWithoutHeaders
      return
    }

    mobileMenuEntries.value = []

    // First, push the menu entries there is room for
    // (skipping headings)
    for (let i = 0; i < numberOfVisibleEntries - 1; i++) {
      const entry = menuWithoutHeaders[i]
      if (!entry.header) mobileMenuEntries.value.push(entry)
    }

    // Then, if menu still contains more entries, make a "more..." entry
    // and append the rest of the entries to that
    const entriesLeft = menuWithoutHeaders.length - numberOfVisibleEntries
    if (entriesLeft) {
      const moreItemsEntry = {
        title: 'more',
        localized: true,
        href: '#',
        icon: 'la la-ellipsis-h',
        child: [],
      }
      for (let i = 0; i < entriesLeft; i++) {
        const entry = menuWithoutHeaders[numberOfVisibleEntries + i]
        if (!entry.header) moreItemsEntry.child.push(entry)
      }

      mobileMenuEntries.value.push(moreItemsEntry)
    }
  }
  const showChildren = (e) => {
    const wrapper = e.target.closest('.entry-wrapper')
    const children = wrapper.querySelector('.children')
    if (children) children.classList.add('open')
  }

  const hideChildren = (e) => {
    const wrapper = e.target.closest('.entry-wrapper')
    const children = wrapper.querySelector('.children')
    if (children) children.classList.remove('open')
  }
</script>

<style lang="scss">
  //                             ,,
  //    .M"""bgd mm            `7MM
  //   ,MI    "Y MM              MM
  //   `MMb.   mmMMmm `7M'   `MF'MM  .gP"Ya
  //     `YMMNq. MM     VA   ,V  MM ,M'   Yb
  //   .     `MM MM      VA ,V   MM 8M""""""
  //   Mb     dM MM       VVV    MM YM.    ,
  //   P"Ybmmd"  `Mbmo    ,V   .JMML.`Mbmmd'
  //                     ,V
  //                  OOb"
  .mobile-menu {
    position: fixed;
    bottom: 0;
    z-index: 2000;
    width: 100%;
    height: 79px;
    background: var(--primary-gradient);
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    text-shadow: 0 0 50px var(--bg-secondary);
    line-height: 1.5;

    .icon {
      // Custom resizing
      display: inline-block;
      width: 24px;
      height: 24px;

      svg {
        stroke-width: 2px;
      }
    }

    > .router-link {
      padding: 0;
      font-size: 80%;
      font-weight: 500;
      color: var(--text-primary);
      min-width: 50px;
      text-decoration: none;
      overflow: hidden;

      .entry-wrapper {
        height: 100%;
        padding: 10px 5px;
      }

      &.router-link-exact-active,
      :has(.router-link-exact-active) {
        font-weight: 700;
      }

      &:hover {
        background: var(--bg-navbar-primary-hover);
      }
    }

    .children {
      opacity: 0;
      transition: all 0.25s ease;
      pointer-events: none;
      position: absolute;
      width: 100%;
      left: 0;
      bottom: 70px;
      font-size: 1.1rem;
      background: var(--bg-menu-primary);
      box-shadow: 0 -8px 8px rgba(0, 0, 0, 0.15);
      max-height: 300px;
      overflow: hidden auto;
      z-index: 1;

      &.open {
        opacity: 1;
        bottom: 100%;
        pointer-events: auto;
      }

      .icon {
        vertical-align: center;
        margin-right: 10px;
      }

      > .child {
        width: 100%;

        :hover {
          background: var(--bg-menu-primary-hover);
          color: var(--text-primary);
        }
      }

      a {
        text-align: left;
        padding: 15px 15%;
        display: flex;
        align-items: center;
        min-width: 300px;
        font-weight: 300;
        color: var(--text-primary);
        text-decoration: none;

        &.router-link-exact-active {
          font-weight: 700;
        }
      }
    }

    .grand-children {
      display: block;
      font-size: 0.8em;

      .icon i::before {
        font-size: 1.2rem;
      }

      .grand-child {
        padding-left: 42px;
        background: var(--bg-navbar-primary-hover);

        :hover {
          background: var(--text-primary);
          color: var(--bg-navbar-primary);
        }
      }
    }
  }
</style>
