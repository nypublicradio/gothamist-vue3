<script setup lang="ts">
import Navigation from '~~/composables/types/Navigation'
import VFlexibleLink from '@nypublicradio/nypr-design-system-vue3/v2/src/components/VFlexibleLink.vue'

defineProps<{
  showLogo: boolean
  navigation: Navigation
  donateUrlBase: string
  utmCampaign: string
}>()
const { $analytics } = useNuxtApp()
const sidebarIsOpen = useSidebarIsOpen()
const strapline = await useStrapline()
const openSidebar = () => {
  sidebarIsOpen.value = true
}

const trackClick = (category, label) => {
  //emitted mobile menu click event
  $analytics.sendEvent('click_tracking', {
    event_category: category,
    component: 'header',
    event_label: label,
  })
}
</script>

<template>
  <header class="gothamist-header flex justify-content-between">
    <div class="gothamist-header-left">
      <v-flexible-link
        to="/"
        raw
        @click="trackClick('Click Tracking - Header', 'header logo')"
      >
        <LogoGothamist v-if="showLogo" class="gothamist-header-logo pr-2" />
      </v-flexible-link>
      <div
        :class="`gothamist-header-tagline ${
          showLogo ? 'hidden' : 'block'
        } md:block`"
        v-html="strapline"
      />
    </div>
    <div class="gothamist-header-right align-items-center">
      <v-flexible-link
        :to="`${donateUrlBase}&utm_campaign=${utmCampaign}`"
        raw
        class="pr-2"
      >
        <Button class="gothamist-header-donate-button p-button-rounded">
          <span class="p-button-label">Donate</span>
        </Button>
      </v-flexible-link>
      <Button
        icon="pi pi-bars"
        class="p-button p-component p-button-icon-only p-button-text p-button-rounded -mr-2"
        aria-label="menu button"
        @click="openSidebar"
      />
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
  max-width: 200px;
  align-self: flex-end;
  padding-right: 1rem;
  @include media('<375px') {
    font-size: 12px;
    line-height: var(--font-size-5);
    align-self: center;
  }
}
</style>
