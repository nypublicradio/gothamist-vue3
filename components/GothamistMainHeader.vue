<script setup lang="ts">
import GothamistSidebarContents from './GothamistSidebarContents.vue'
import Navigation from '~~/composables/types/Navigation'
import VFlexibleLink from '@nypublicradio/nypr-design-system-vue3/v2/src/components/VFlexibleLink.vue'

defineProps<{
  showLogo: boolean
  navigation: Navigation
  donateUrl: string
}>()

const sideBarVisible = ref(false)

const menuListClick = (menuTitle) => {
  //emitted mobile menu click event
  // sendEvent('click_tracking', {
  //   event_category: 'Click Tracking',
  //   component: 'SideBar',
  //   event_label: menuTitle,
  // })

  // close the sidebar after menu item click
  sideBarVisible.value = false
}
</script>

<template>
  <header class="gothamist-header flex justify-content-between">
    <div class="gothamist-header-left">
      <v-flexible-link to="/" raw @click="menuListClick('header logo')">
        <LogoGothamist v-if="showLogo" class="gothamist-header-logo pr-2" />
      </v-flexible-link>
      <div
        :class="`gothamist-header-tagline ${
          showLogo ? 'hidden' : 'block'
        } md:block`"
      >
        News for New Yorkers
      </div>
    </div>
    <div class="gothamist-header-right">
      <v-flexible-link
        :to="`${donateUrl}&utm_campaign=goth_header`"
        raw
        class="pr-2"
      >
        <Button class="gothamist-header-donate-button p-button-rounded">
          <span class="p-button-label">Donate</span>
        </Button>
      </v-flexible-link>
      <Button
        icon="pi pi-bars"
        class="p-button p-component p-button-icon-only p-button-text p-button-rounded"
        @click="sideBarVisible = true"
      />
      <Sidebar
        v-model:visible="sideBarVisible"
        position="right"
        data-style-mode="dark"
        class="gothamist-sidebar px-3 md:px-4"
      >
        <template v-slot:header>
          <div
            class="gothamist-sidebar-header flex md:hidden align-items-center"
          >
            <v-flexible-link to="/" raw @click="menuListClick('sidebar logo')">
              <LogoGothamist class="gothamist-sidebar-header-logo pr-2" />
            </v-flexible-link>
            <div class="gothamist-sidebar-header-tagline">
              News for New Yorkers
            </div>
          </div>
        </template>
        <template v-slot:default>
          <GothamistSidebarContents
            :navigation="navigation"
            :donateUrl="donateUrl"
            class="mt-3"
            @menuListClick="menuListClick($event)"
          />
        </template>
      </Sidebar>
    </div>
  </header>
</template>

<style lang="scss">
.gothamist-header {
  width: 100%;
  height: 68px;
  max-width: $contentWidth;
  margin: auto;
  padding: 1rem 1.5rem;
  @include media('>=lg') {
    padding: 1rem 2.5rem;
  }
  display: flex;
}
.gothamist-header-logo {
  height: 34px;
  width: auto;
}

.gothamist-header-left,
.gothamist-header-center,
.gothamist-header-right {
  align-items: flex-end;
  display: flex;
}

.gothamist-header-donate-button {
  max-height: 36px;
}

.gothamist-header-tagline {
  font-family: var(--font-family-header);
  font-size: 14px;
  line-height: var(--font-size-6);
  font-weight: 600;
  color: black;
  width: 86px;
  align-self: flex-end;
}

.gothamist-sidebar.p-sidebar-right {
  background-color: var(--black-500);
  width: 100vw;
  @include media('>sm') {
    width: 480px;
  }
  .p-sidebar-close {
    color: white;
  }
}

.gothamist-sidebar .p-sidebar-header {
  justify-content: space-between;
  padding: 1rem 0 0 0;
}

.gothamist-sidebar .p-sidebar-header {
  align-items: flex-end;
}

.gothamist-sidebar-header-logo {
  width: 120px;
  padding-bottom: 3px;
  height: auto;
  * {
    fill: white;
  }
}

.gothamist-sidebar-header-tagline {
  width: 71px;
  font-family: var(--font-family-header);
  font-size: 12px;
  line-height: var(--font-size-5);
  color: white;
}

.gothamist-sidebar .p-sidebar-content {
  padding: 0;
}

.p-sidebar-mask {
  background-color: rgba(0, 0, 0, 0.8) !important;
}
</style>
