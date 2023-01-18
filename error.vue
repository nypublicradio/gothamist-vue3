<script setup lang="ts">
import VFlexibleLink from '@nypublicradio/nypr-design-system-vue3/v2/src/components/VFlexibleLink.vue'
import { ref, onMounted } from 'vue'
import { useRuntimeConfig } from '#app'
import { useSidebarIsOpen } from '~~/composables/states.js'

const config = useRuntimeConfig()
const route = useRoute()
const { $htlbid, $analytics } = useNuxtApp()

const props = defineProps({
  error: {
    type: Object,
    default: {},
  },
})

const navigationState = useNavigation()
const navigationPromise = findNavigation().then(({ data }) => {
  const navigationData = normalizeFindNavigationResponse(data)
  navigationState.value = navigationData
  return navigationData
})

const breakingNewsPromise = findBreakingNews().then(({ data }) =>
  normalizeFindBreakingNewsResponse(data)
)
const productBannersPromise = findProductBanners().then(({ data }) =>
  normalizeFindProductBannersResponse(data)
)

const [navigation, breakingNews, productBanners] = await Promise.all([
  navigationPromise,
  breakingNewsPromise,
  productBannersPromise,
])

const atTop = ref(true)
const strapline = useStrapline()
const sensitiveContent = useSensitiveContent()
const sidebarOpen = useSidebarIsOpen()
const sidebarOpenedFrom = useSidebarOpenedFrom()
const closeSidebar = () => {
  sidebarOpen.value = false
}

const handleSidebarHidden = () => {
  if (sidebarOpenedFrom.value?.focus) {
    sidebarOpenedFrom.value.focus()
  }
}

const handleSidebarTab = (e) => {
  if (!e.shiftKey && document.activeElement === lastElement) {
    firstElement.focus()
    e.preventDefault()
  }
}

const handleSidebarShiftTab = (e) => {
  if (document.activeElement === firstElement) {
    lastElement.focus()
    e.preventDefault()
  }
}

let sidebarElements = undefined
let firstElement = undefined
let lastElement = undefined

const handleSidebarShown = () => {
  sidebarElements = Array.from(
    document.querySelectorAll(
      '.p-sidebar a:not([disabled]), .p-sidebar button:not([disabled])'
    )
  ).filter((element) => element.clientWidth + element.clientHeight !== 0)
  firstElement = sidebarElements[0]
  lastElement = sidebarElements[sidebarElements.length - 1]
}

const trackSidebarClick = (label) => {
  //emitted mobile menu click event
  $analytics.sendEvent('click_tracking', {
    event_category: 'Click Tracking - Mobile Menu',
    component: 'header',
    event_label: label,
  })
  closeSidebar()
}

onMounted(() => {
  $analytics.sendPageView({ page_type: 'error_page' })
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

const newsletterSubmitEvent = () => {
  $analytics.sendEvent('click_tracking', {
    event_category: 'Click Tracking - Footer - Newsletter',
    component: 'footer',
    event_label: 'Newsletter',
  })
}
useHead({
  script: [
    {
      src: `https://www.googletagmanager.com/gtag/js?id=${config.GA_MEASUREMENT_ID}`,
      async: true
    },
    {
      src: config.HTL_JS,
      async: true
    }
  ],
  meta: [
    {property: 'og:site_name', content: 'Gothamist'},
    {property: 'og:type', content: 'website'},
    {property: 'og:url', content: `https://www.gothamist.com${route.fullPath}`},
    {property: 'og:title', content: 'Gothamist: New York City Local News, Food, Arts & Events'},
    {property: 'og:site_name', content:'Gothamist'},
    {property: 'og:description', content:'Gothamist is a non-profit local newsroom, powered by WNYC.'},
    {property: 'og:image', content: config.OG_IMAGE},
    {property: 'og:locale', content:'en_US'},
    {property: 'og:image:width', content:'1200'},
    {property: 'og:image:height', content:'650'},
    {property: 'fb:app_id', content:'151261804904925'},
    {name: 'twitter:card', content:'summary_large_image'},
    {name: 'twitter:site', content:'@gothamist'}
  ]
})
</script>
<template>
  <div class="error-page">
    <Html lang="en">
      <Head>
        <Link rel="preconnect" :href="config.API_URL" />
        <Link rel="stylesheet" :href="config.HTL_CSS" type="text/css" />
        <Title>Gothamist: New York City Local News, Food, Arts & Events</Title>
        <Meta
          name="description"
          content="Gothamist is a website about New York City news, arts and events, and food, brought to you by New York Public Radio."
        />
      </Head>
    </Html>
    <div v-if="!sensitiveContent" class="htlad-skin" />
    <div
      class="leaderboard-ad-wrapper flex justify-content-center align-items-center"
    >
      <div v-if="!sensitiveContent" class="htlad-index_leaderboard_1"></div>
    </div>
    <GothamistMainHeader
      :navigation="navigation"
      :isMinimized="route.name !== 'index'"
      :donateUrlBase="config.donateUrlBase"
      utmCampaign="goth_header"
    />
    <Sidebar
      v-model:visible="sidebarOpen"
      :baseZIndex="6000"
      position="right"
      data-style-mode="dark"
      ariaCloseLabel="close the navigation menu"
      class="gothamist-sidebar px-3 md:px-4"
      @show="handleSidebarShown"
      @hide="handleSidebarHidden"
      @keydown.esc="closeSidebar"
      @keydown.tab="handleSidebarTab"
      @keydown.shift.tab="handleSidebarShiftTab"
    >
      <template v-slot:header>
        <div class="gothamist-sidebar-header flex md:hidden">
          <v-flexible-link
            to="/"
            raw
            @click="trackSidebarClick('sidebar logo')"
          >
            <LogoGothamist class="gothamist-sidebar-header-logo pr-2" />
          </v-flexible-link>
          <div class="gothamist-sidebar-header-tagline" v-html="strapline" />
        </div>
      </template>
      <template v-slot:default>
        <GothamistSidebarContents
          :navigation="navigation"
          :donateUrlBase="config.donateUrlBase"
          @menuListClick="trackSidebarClick($event)"
          utmCampaign="goth_hamburger"
          class="mt-3"
        />
      </template>
    </Sidebar>
    <main>
      <section class="error-page-header">
        <div class="content">
          <div class="error-page-error pt-2">
            {{ error.statusCode }} Error - {{ error.statusMessage }}
          </div>
          <div v-if="config.DEBUG === 'true'" class="mt-4">
            <pre class="font-bold">{{ error.message }}</pre>
            <div v-html="error.description"></div>
          </div>
          <h2 class="text-center p-6">
            The page you're looking for doesn't appear to exist. Please check
            out our latest stories below.
          </h2>
        </div>
      </section>
      <section>
        <div class="content">
          <!-- featured area -->
          <article-recirculation />
          <!-- newsletter -->
          <div class="mt-8 mb-5">
            <hr class="black mb-4" />
            <newsletter-home @submit="newsletterSubmitEvent" />
          </div>
        </div>
      </section>
    </main>
    <gothamist-footer :navigation="navigation" />
  </div>
</template>

<style lang="scss">
.error-page {
  @include page-top-gradient;
  .error-page-header {
    background: var(--soybean200);
  }
  .error-page-error {
    font-size: var(--font-size-5);
    line-height: var(--font-size-5);
    font-weight: 400;
    text-transform: uppercase;
    text-align: left;
    border-top: solid 1px var(--black);
    font-family: var(--font-family-header);
    @include media('>lg') {
      font-size: var(--font-size-6);
      line-height: var(--font-size-6);
    }
  }
}
</style>
