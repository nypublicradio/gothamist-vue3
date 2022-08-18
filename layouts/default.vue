<script setup lang="ts">
import VFlexibleLink from '@nypublicradio/nypr-design-system-vue3/v2/src/components/VFlexibleLink.vue'
import { ref, onMounted } from 'vue'
import { useRuntimeConfig } from '#app'
import { useSidebarIsOpen } from '~~/composables/states.js';

const config = useRuntimeConfig()
const route = useRoute()
const { $htlbid } = useNuxtApp()
const atTop = ref(true)
const navigation = await findNavigation().then(({ data }) =>
  normalizeFindNavigationResponse(data)
)
const navigationState = useNavigation()
navigationState.value = navigation

const breakingNews = await findBreakingNews().then(({ data }) =>
  normalizeFindBreakingNewsResponse(data)
)
const productBanners = await findProductBanners().then(({ data }) =>
  normalizeFindProductBannersResponse(data)
)
const sensitiveContent = useSensitiveContent()
const sidebarOpen = useSidebarIsOpen()

onMounted(() => {
  document.addEventListener('scroll', (e) => {
    atTop.value = window.scrollY > 0 ? false : true
    //atBottom.value = ((window.scrollY + (window.innerHeight + 115) >= document.body.scrollHeight)) ? true : false
  })
  $htlbid.init()
  $htlbid.setTargeting({
    is_testing: config.HTL_IS_TESTING,
  })
  $htlbid.setTargetingForRoute(route)
})
watch(route, (value) => {
  $htlbid.setTargetingForRoute(value)
  $htlbid.clearAds()
})
</script>

<template>
  <div class="page" :class="[`${route.name as string}`]">
    <Html lang="en">
      <Head>
        <Link rel="preconnect" :href="config.API_URL" />
        <Script
          :src="`https://www.googletagmanager.com/gtag/js?id=${config.GA_MEASUREMENT_ID}`"
          async
        />
        <Link rel="stylesheet" :href="config.HTL_CSS" type="text/css" />
        <Script :src="config.HTL_JS" async />
        <Title>Gothamist: New York City Local News, Food, Arts & Events</Title>
        <Meta
          name="description"
          content="Gothamist is a website about New York City news, arts and events, and food, brought to you by New York Public Radio."
        />
        <Meta
          name="og:site_name"
          content="Gothamist: New York City Local News, Food, Arts & Events"
        />
        <Meta name="og:type" content="website" />
        <Meta
          name="og:url"
          :content="`https://www.gothamist.com${route.fullPath}`"
        />
        <Meta
          name="og:title"
          content="Gothamist is a website about New York City news, arts and events, and food, brought to you by New York Public Radio."
        />
        <Meta name="og:description" content="Investigating a strange world." />
        <Meta
          name="og:image"
          content="https://gothamist.com/static-images/home_og_1200x650.png"
        />
        <Meta name="og:locale" content="en_US" />
        <Meta name="og:image:width" content="1200" />
        <Meta name="og:image:height" content="650" />
        <Meta name="fb:app_id" content="151261804904925" />
        <Meta name="twitter:card" content="summary_large_image" />
        <Meta name="twitter:site" content="@gothamist" />
      </Head>
    </Html>
    <div v-if="!sensitiveContent" class="htlad-skin" />
    <div class="leaderboard-ad-wrapper">
      <div v-if="!sensitiveContent" class='htlad-gothamist_index_leaderboard_1'></div>
    </div>
    <GothamistMainHeader 
      :navigation="navigation"
      :showLogo="route.name !== 'index'"
      :donateUrl="config.donateUrlBase"
    />
    <Sidebar 
      v-model:visible="sidebarOpen" 
      position="right" 
      data-style-mode="dark" 
      class="gothamist-sidebar px-3 md:px-4">
      <template v-slot:header>
          <div class="gothamist-sidebar-header flex md:hidden">
              <v-flexible-link to="/" raw>
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
              :donateUrl="config.donateUrlBase" 
              class="mt-3"
          />
      </template>
    </SideBar>
    <main>
      <slot />
    </main>
    <scroll-to-top-button />
    <gothamist-footer :navigation="navigation" />
  </div>
</template>

<style lang="scss">
  .leaderboard-ad-wrapper {
    background: #111111;
    @include media('<md') {
      height: 116px;
      padding: 8px auto;
      position: sticky;
      top: 0;
      z-index: 5000;
    }
    @include media('>=md') {
      height: 306px;
      padding: 28px auto;
    }
  }
</style>
