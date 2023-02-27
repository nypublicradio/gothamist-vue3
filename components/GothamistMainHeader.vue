<script setup lang="ts">
import Navigation from '~~/composables/types/Navigation'
import VFlexibleLink from '@nypublicradio/nypr-design-system-vue3/v2/src/components/VFlexibleLink.vue'
import {
  useCurrentHeaderAdHeight,
  useCurrentSteamStation,
} from '~/composables/states'

defineProps<{
  isMinimized: boolean
  isFixed?: boolean
  navigation: Navigation
  donateUrlBase: string
  utmCampaign: string
}>()
const currentSteamStation = useCurrentSteamStation()
const { $analytics } = useNuxtApp()
const sidebarIsOpen = useSidebarIsOpen()
const sidebarOpenedFrom = useSidebarOpenedFrom()
const strapline = await useStrapline()
const currentHeaderAdHeight = useCurrentHeaderAdHeight()
const openSidebar = (e) => {
  sidebarIsOpen.value = true
  sidebarOpenedFrom.value = e.target
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
  <header
    class="gothamist-header"
    :class="[{ 'is-fixed': isFixed }]"
    :style="isFixed ? `top:${currentHeaderAdHeight}px;` : ``"
  >
    <div
      class="top flex justify-content-between align-items-center sm:align-items-end"
    >
      <div class="gothamist-header-left">
        <v-flexible-link
          class="block"
          :class="isMinimized ? 'hidden' : 'xl:hidden'"
          to="/"
          raw
          @click="trackClick('Click Tracking - Header', 'header logo')"
        >
          <LogoGothamist class="gothamist-header-logo pr-2" />
        </v-flexible-link>
        <div class="gothamist-header-tagline-holder hidden sm:block">
          <div class="gothamist-header-tagline" v-html="strapline" />
        </div>
      </div>
      <v-flexible-link
        class="hidden"
        :class="isMinimized ? 'xl:hidden' : 'xl:block'"
        to="/"
        raw
        @click="trackClick('Click Tracking - Header', 'header logo')"
        role="heading"
        aria-level="1"
      >
        <LogoGothamist class="gothamist-header-center-logo" />
      </v-flexible-link>
      <div class="gothamist-header-right align-items-center gap-2">
        <!-- <ListenAllLiveButton class="hidden md:block" /> -->
        <ListenLiveButton
          class="hidden md:block"
          :slug="currentSteamStation"
          @stream-button-click="
            trackClick('Click Tracking - Header', 'Listen Live button')
          "
        />
        <a
          class="gothamist-header-donate-button mod-button p-component p-button-rounded p-button"
          :href="`${donateUrlBase}&utm_campaign=${utmCampaign}`"
          target="_blank"
          rel="noopener noreferrer"
          @click="trackClick('Click Tracking - Header', 'donate button')"
        >
          <span class="p-button-label">Donate</span>
        </a>
        <SearchButton
          @onNavigate="trackClick('Click Tracking - Header', 'search button')"
        />
        <Button
          icon="pi pi-bars"
          class="hamburger p-button p-component p-button-icon-only p-button-text p-button-rounded -mr-2"
          aria-label="Open the navigation menu"
          aria-expanded="false"
          @click="openSidebar"
        />
      </div>
    </div>
    <div v-if="!isMinimized" class="bottom hidden md:block">
      <div class="col-12 p-0">
        <menu-list
          class="p-0"
          isHeader
          :navLinks="navigation.primaryNavigation"
        />
      </div>
    </div>
  </header>
</template>

<style lang="scss">
.gothamist-header {
  &.is-fixed {
    opacity: 0;
    display: none;
    position: fixed;
    left: 0;
    right: 0;
    z-index: 100;
    background-color: var(--white);
    top: 90px;
    @include media('>=md') {
      top: 0px !important;
    }
  }
  .top,
  .bottom {
    width: 100%;
    max-width: $contentWidth;
    margin: auto;
    display: flex;
  }
  .top {
    padding: 1rem 1.5rem 1rem 1.5rem;
    @include media('>=lg') {
      padding: 1rem 2.5rem 1rem 2.5rem;
    }
    //height: 68px;
  }
  .bottom {
    padding: 0rem 1.5rem 1rem 1.5rem;
    @include media('>=lg') {
      padding: 0rem 2.5rem 1rem 2.5rem;
    }
    /*  .homepage-topper-logo {
      height: auto;
    } */
  }
}

.gothamist-header-logo {
  height: 34px;
  width: auto;
  @include media('<xs') {
    height: 25px;
    align-self: center;
  }
}
.gothamist-header-center-logo {
  height: 66px;
  width: auto;
}

.gothamist-header-left,
.gothamist-header-center,
.gothamist-header-right {
  align-items: flex-end;
  display: flex;
}

.gothamist-header-right {
  .p-button {
    .pi-bars {
      font-size: 1.25rem;
    }
    .pi-search {
      font-weight: bold;
    }
  }
}

.gothamist-header-donate-button {
  @include media('<xs') {
    font-size: 0.875rem;
    padding: 8.75px 13.125px;
  }
}

.gothamist-header-tagline-holder {
  width: 345px;
  @include media('<xl') {
    max-width: 185px;
  }
  .gothamist-header-tagline {
    font-family: var(--font-family-header);
    font-size: 14px;
    line-height: var(--font-size-6);
    font-weight: 600;
    color: black;
    align-self: flex-end;
    padding-right: 1rem;
    max-width: 200px;
    @include media('<376px') {
      font-size: 12px;
      line-height: var(--font-size-5);
      align-self: center;
    }
  }
}
</style>
