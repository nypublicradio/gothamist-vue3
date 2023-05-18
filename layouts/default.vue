<script setup lang="ts">
import VFlexibleLink from '@nypublicradio/nypr-design-system-vue3/v2/src/components/VFlexibleLink.vue'
const marketingBannerData = useMarketingBannerData()

const config = useRuntimeConfig()
const route = useRoute()
const { $htlbid, $analytics, $features } = useNuxtApp()

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
marketingBannerData.value = productBanners
const isSponsoredRoute = route.name === 'sponsored'
const strapline = useStrapline()
const sensitiveContent = useSensitiveContent()
const fixedHeaderVisible = useFixedHeaderVisible()
const sidebarOpen = useSidebarIsOpen()
const sidebarOpenedFrom = useSidebarOpenedFrom()
const closeSidebar = () => {
  sidebarOpen.value = false
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

const trackSidebarClick = (label) => {
  //emitted mobile menu click event
  $analytics.sendEvent('click_tracking', {
    event_category: 'Click Tracking - Mobile Menu',
    component: 'header',
    event_label: label,
  })
  closeSidebar()
}
// load the live stream
onBeforeMount(async () => {
  const currentSteamStation = useCurrentSteamStation()
  await updateLiveStream(currentSteamStation.value)
})
onMounted(() => {
  if (typeof $htlbid !== "undefined") {
    $htlbid.init()
    $htlbid.setTargeting({
      is_testing: config.public.HTL_IS_TESTING,
    })
    $htlbid.setTargetingForRoute(route)
  }
})

watch(route, (value) => {
  if (typeof $htlbid !== "undefined") {
    $htlbid.setTargetingForRoute(value)
    $htlbid.clearAds()
  }
})

useHead({
  htmlAttrs: {
    lang: 'en',
  },
  title: 'Gothamist: New York City Local News, Food, Arts & Events',
  meta: [
    {
      name: 'description',
      content: 'Gothamist is a non-profit local newsroom, powered by WNYC.',
    },
  ],
  script: [
    {
      children: `
      addEventListener("DOMContentLoaded", () =>
        {
          window.twttr = (function(d, s, id) {
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
        }(document, 'script', 'twitter-wjs'));
      })`,
    },
  ]
})

// Resource Hints
useServerHead({
  link: [
    { rel: 'preconnect', href: config.public.API_URL, crossorigin: '', tagPriority: 'high'},
    { rel: 'preconnect', href: config.public.IMAGE_CDN_URL, tagPriority: 'high'},
  ],
})

// Metadata
if (isSponsoredRoute) {
  useServerHead({
    meta: [{ name: 'robots', content: 'noindex,nofollow' }],
  })
} else {
  useServerHead({
    meta: [
      { property: 'og:site_name', content: 'Gothamist' },
      { property: 'og:type', content: 'website' },
      {
        property: 'og:url',
        content: `https://www.gothamist.com${route.fullPath}`,
      },
      {
        property: 'og:title',
        content: 'Gothamist: New York City Local News, Food, Arts & Events',
      },
      { property: 'og:site_name', content: 'Gothamist' },
      {
        property: 'og:description',
        content: 'Gothamist is a non-profit local newsroom, powered by WNYC.',
      },
      { property: 'og:image', content: config.public.OG_IMAGE },
      { property: 'og:locale', content: 'en_US' },
      { property: 'og:image:width', content: '1200' },
      { property: 'og:image:height', content: '650' },
      { property: 'fb:app_id', content: '151261804904925' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:site', content: '@gothamist' },
    ],
  })
}
</script>

<template>
  <div class="page" :class="[`${route.name as string}`]">
    <div>
      <div v-if="!sensitiveContent" class="htlad-skin" />
      <div
        class="leaderboard-wrapper flex justify-content-center align-items-center flex-column"
      >
        <div class="leaderboard-ad-backdrop">
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
        <div class="leaderboard-container">
        <Transition name="fixed-header">
          <GothamistMainHeader
              v-if="fixedHeaderVisible && route.name !== 'sectionSlug-articleSlug'"
              class="fixed-header"
              :navigation="navigation"
              :isMinimized="true"
              :donateUrlBase="config.public.donateUrlBase"
              utmCampaign="homepage-header"
            />
        </Transition>
          <div id="article-header" />
        </div>
      </div>
      <main class="main">
        <GothamistMainHeader
          :navigation="navigation"
          :isMinimized="route.name !== 'index'"
          :donateUrlBase="config.public.donateUrlBase"
          utmCampaign="homepage-header"
          @visible="() => { fixedHeaderVisible = false }"
          @not-visible="() => { fixedHeaderVisible = true }"
        />
        <slot />
      </main>
      <gothamist-footer :navigation="navigation" />
      <audio-player />
      <MarketingModal
        v-if="productBanners.length > 0"
        :banners="productBanners"
      />
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
        <v-flexible-link to="/" raw @click="trackSidebarClick('sidebar logo')">
          <LogoGothamist class="gothamist-sidebar-header-logo pr-2" />
        </v-flexible-link>
        <div class="gothamist-sidebar-header-tagline" v-html="strapline" />
      </div>
    </template>
    <template v-slot:default>
      <GothamistSidebarContents
        :navigation="navigation"
        :donateUrlBase="config.public.donateUrlBase"
        @menuListClick="trackSidebarClick($event)"
        utmCampaign="goth_hamburger"
        class="mt-3"
      />
    </template>
  </Sidebar>
</template>

<style lang="scss">
.leaderboard-wrapper {
  background: transparent;
  @include media('<md') {
    position: sticky;
    top: 0;
    z-index: 5000;
  }
}

.leaderboard-ad-backdrop {
  background: #111111;
  min-height: 50px;
  width: 100vw;
  padding: 0;
  @include media('>=md') {
    min-height: 92px;
    padding: 1px 0;
  }
}

.leaderboard-container {
  position: relative;
}

.fixed-header {
  background: #ffffff;
  position: absolute;
  top: 0;
  left: -50vw;
  width: 100vw;
  min-height:73.5px;
  display: block;
  transition: opacity  0.25s linear;
  opacity: 1;
  @include media('>=md') {
    position: fixed;
    left: 0;
    z-index: 20;
  }  
}

.fixed-header-enter-active, .fixed-header-leave-active { opacity: 0; }

.main {
  @include page-top-gradient;
}
.sectionSlug-photos-gallerySlug {
  .main {
    background: none;
  }
}

.gothamist-sidebar {
  background-color: var(--black-500);
  width: 100vw !important;
  @include media('>sm') {
    width: 480px !important;
  }
  .p-sidebar-close {
    color: white !important;
    &:hover {
      color: initial !important;
    }
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

.gothamist-footer {
  content-visibility: auto;
  contain-intrinsic-size: auto 430px;
  @include media('>=md') {
    contain-intrinsic-size: auto 396px;
  }
}
</style>
