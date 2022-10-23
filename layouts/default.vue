<script setup lang="ts">
import VFlexibleLink from '@nypublicradio/nypr-design-system-vue3/v2/src/components/VFlexibleLink.vue'
import { onMounted } from 'vue'
import { useRuntimeConfig } from '#app'

const config = useRuntimeConfig()
const route = useRoute()
const { $htlbid, $analytics } = useNuxtApp()

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

const [navigation, breakingNews, productBanners] = await Promise.all(
  [navigationPromise, breakingNewsPromise, productBannersPromise]
)

const isSponsored = route.name === 'sponsored'
const strapline = useStrapline()
const sensitiveContent = useSensitiveContent()
const sidebarOpen = useSidebarIsOpen()
const sidebarOpenedFrom = useSidebarOpenedFrom()
const closeSidebar = () => {
  sidebarOpen.value = false
}

let sidebarElements = undefined
let firstElement = undefined
let lastElement = undefined

const handleSidebarShown = () => {
  sidebarElements = Array.from(document.querySelectorAll('.p-sidebar a:not([disabled]), .p-sidebar button:not([disabled])')).filter(element => element.clientWidth + element.clientHeight !== 0)
  firstElement = sidebarElements[0]
  lastElement = sidebarElements[sidebarElements.length - 1]
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
    lastElement.focus();
    e.preventDefault()
  }
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
        <Script
          type="text/javascript"
          src="https://s.ntv.io/serve/load.js"
          data-ntv-set-no-auto-start
          async
        />
        <Link rel="stylesheet" :href="config.HTL_CSS" type="text/css" />
        <Script :src="config.HTL_JS" async />
        <Title>Gothamist: New York City Local News, Food, Arts & Events</Title>
        <Meta
          name="description"
          content="Gothamist is a non-profit local newsroom, powered by WNYC."
        />
      </Head>
      <Head v-if="!isSponsored">
        <Meta
          name="og:site_name"
          content="Gothamist"
        />
        <Meta name="og:type" content="website" />
        <Meta
          name="og:url"
          :content="`https://www.gothamist.com${route.fullPath}`"
        />
        <Meta
          name="og:title"
          content="Gothamist: New York City Local News, Food, Arts & Events"
        />
        <Meta name="og:description" content="Gothamist is a non-profit local newsroom, powered by WNYC." />
        <Meta name="og:image" :content="config.OG_IMAGE" />
        <Meta name="og:locale" content="en_US" />
        <Meta name="og:image:width" content="1200" />
        <Meta name="og:image:height" content="650" />
        <Meta name="fb:app_id" content="151261804904925" />
        <Meta name="twitter:card" content="summary_large_image" />
        <Meta name="twitter:site" content="@gothamist" />
      </Head>

      <Head v-if="isSponsored">
        <Meta name="Googlebot-News" content="noindex, nofollow" />
      </Head>
      <Script children="window.twttr = (function(d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0],
          t = window.twttr || {};
        if (d.getElementById(id)) return t;
        js = d.createElement(s);
        js.id = id;
        js.src = 'https://platform.twitter.com/widgets.js';
        fjs.parentNode.insertBefore(js, fjs);

        t._e = [];
        t.ready = function(f) {
          t._e.push(f);
        };

        return t;
      }(document, 'script', 'twitter-wjs'));" />
    </Html>

    <!-- Google Tag Manager (noscript) -->
    <div
      v-html="
        `<noscript><iframe src=&quot;https://www.googletagmanager.com/ns.html?id=${config.GTM_ID}&quot;
    height=&quot;0&quot; width=&quot;0&quot; style=&quot;display:none;visibility:hidden&quot;></iframe></noscript>`
      "
    />
    <!-- End Google Tag Manager (noscript) -->
    <div>
      <div v-if="!sensitiveContent" class="htlad-skin" />
      <div
        class="leaderboard-ad-wrapper flex justify-content-center align-items-center"
      >
        <HtlAd
          v-if="route.name === 'index'"
          layout="leaderboard"
          slot="htlad-gothamist_index_leaderboard_1"
        />
        <HtlAd
          v-else
          layout="leaderboard"
          slot="htlad-gothamist_interior_leaderboard_1"
        />
      </div>
      <GothamistMainHeader
        :navigation="navigation"
        :showLogo="route.name !== 'index'"
        :donateUrlBase="config.donateUrlBase"
        utmCampaign="homepage-header"
      />
      <main>
        <slot />
      </main>
      <scroll-to-top-button />
      <gothamist-footer :navigation="navigation" />
    </div>
  </div>
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
</template>

<style lang="scss">
.leaderboard-ad-wrapper {
  background: #111111;
  @include media('<md') {
    height: 50px;
    padding: 0px auto;
    position: sticky;
    top: 0;
    z-index: 5000;
  }
  @include media('>=md') {
    height: 92px;
    padding: 1px auto;
  }
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
  align-items: flex-start;
}

.gothamist-sidebar-header-logo {
  width: 120px;
  height: auto;
  * {
    fill: white;
  }
}

.gothamist-sidebar .p-sidebar-content {
  padding: 0;
}

.p-sidebar-mask {
  background-color: rgba(0, 0, 0, 0.8) !important;
}

.gothamist-sidebar-header-tagline {
  max-width: 160px;
  font-family: var(--font-family-header);
  font-size: 12px;
  line-height: var(--font-size-5);
  color: white;
  align-self: flex-end;
  padding-right: 1rem;
  @include media('<375px') {
    font-size: 10px;
    line-height: var(--font-size-4);
  }
}
</style>
