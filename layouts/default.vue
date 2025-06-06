<script setup lang="ts">
import VFlexibleLink from '@nypublicradio/nypr-design-system-vue3/v2/src/components/VFlexibleLink.vue'

const config = useRuntimeConfig()
const route = useRoute()
const { $htlbid, $analytics } = useNuxtApp()

const navigationState = useNavigation()
const navigationPromise = findNavigation().then(({ data }) => {
  const navigationData = normalizeFindNavigationResponse(data)
  navigationState.value = navigationData
  return navigationData
})

const breakingNewsPromise = findBreakingNews().then(({ data }) => {
  return normalizeFindBreakingNewsResponse(data)
})

const [navigation, breakingNews] = await Promise.all([
  navigationPromise,
  breakingNewsPromise,
])

const isSponsoredRoute = route.name === 'sponsored'
const strapline = useStrapline()
const sensitiveContent = useSensitiveContent()
const fixedHeaderVisible = useFixedHeaderVisible()
const sidebarOpen = useSidebarIsOpen()
const sidebarOpenedFrom = useSidebarOpenedFrom()
const META_TAG_PRIORITY = 2
function closeSidebar() {
  sidebarOpen.value = false
}

let sidebarElements, firstElement, lastElement

function handleSidebarShown() {
  sidebarElements = Array.from(
    document.querySelectorAll(
      '.p-sidebar a:not([disabled]), .p-sidebar button:not([disabled])',
    ),
  ).filter(element => element.clientWidth + element.clientHeight !== 0)
  firstElement = sidebarElements[0]
  lastElement = sidebarElements[sidebarElements.length - 1]
}

function handleSidebarHidden() {
  if (sidebarOpenedFrom.value?.focus)
    sidebarOpenedFrom.value.focus()
}

function handleSidebarTab(e) {
  if (!e.shiftKey && document.activeElement === lastElement) {
    firstElement.focus()
    e.preventDefault()
  }
}

function handleSidebarShiftTab(e) {
  if (document.activeElement === firstElement) {
    lastElement.focus()
    e.preventDefault()
  }
}

function trackSidebarClick(label) {
  // emitted mobile menu click event
  $analytics.scheduleEvent('click_tracking', {
    event_category: 'Click Tracking - Mobile Menu',
    component: 'header',
    event_label: label,
  })
  closeSidebar()
}

// Track users coming from newsletter
const maxAge = 60 * 60 * 24 * 30 * 12 // about 12 months
if (route.query.utm_medium === 'nypr-email') {
  const cookie = useCookie('__gothamistNewsletterMember', { path: '/', maxAge })
  cookie.value = 'true'
}
// update newsletter cookie expiration
const newsLetterCookie = useCookie('__gothamistNewsletterMember', { path: '/', maxAge })
if (newsLetterCookie.value === 'true')
  newsLetterCookie.value = 'true'

// load the live stream
onBeforeMount(async () => {
  const currentSteamStation = useCurrentSteamStation()
  await updateLiveStream(currentSteamStation.value)
})
onMounted(() => {
  if (typeof $htlbid !== 'undefined') {
    $htlbid.init()
    $htlbid.setTargeting({
      is_testing: config.public.HTL_IS_TESTING,
    })
    $htlbid.setTargetingForRoute(route)
  }
})
watch(route, (value) => {
  if (typeof $htlbid !== 'undefined') {
    $htlbid.setTargetingForRoute(value)
    $htlbid.clearAds()
  }
})

useHead({
  htmlAttrs: {
    lang: 'en',
  },
  title: 'Gothamist: New York City Local News, Food, Arts & Events',
  // meta: [
  // {
  // name: 'description',
  // content: 'Gothamist is a non-profit local newsroom, powered by WNYC.',
  // tagPriority: META_TAG_PRIORITY,
  // },
  // ],
  link: [
    { rel: 'preconnect', href: config.public.API_URL },
  ],
  script: [
    {
      src: config.public.HTL_JS,
      async: true,
    },
  ],
})

// Resource Hints
useServerHead({
  link: [
    { rel: 'preconnect', href: config.public.API_URL, crossorigin: '', tagPriority: 'high' },
    { rel: 'preconnect', href: config.public.IMAGE_CDN_URL, tagPriority: 'high' },
  ],
})

// Metadata
if (isSponsoredRoute) {
  useServerHead({
    meta: [{ name: 'robots', content: 'noindex,nofollow' }],
  })
}
else {
  useServerHead({
    meta: [
      { property: 'og:site_name', content: 'Gothamist', tagPriority: META_TAG_PRIORITY },
      { property: 'og:type', content: 'website', tagPriority: META_TAG_PRIORITY },
      {
        property: 'og:url',
        content: `https://www.gothamist.com${route.fullPath}`,
        tagPriority: META_TAG_PRIORITY,
      },
      {
        property: 'og:title',
        content: 'Gothamist: New York City Local News, Food, Arts & Events',
        tagPriority: META_TAG_PRIORITY,
      },
      { property: 'og:site_name', content: 'Gothamist', tagPriority: META_TAG_PRIORITY },
      {
        property: 'og:description',
        content: 'Gothamist is a non-profit local newsroom, powered by WNYC.',
        tagPriority: META_TAG_PRIORITY,
      },
      { property: 'og:image', content: config.public.OG_IMAGE, tagPriority: META_TAG_PRIORITY },
      { property: 'og:locale', content: 'en_US', tagPriority: META_TAG_PRIORITY },
      { property: 'og:image:width', content: '1200', tagPriority: META_TAG_PRIORITY },
      { property: 'og:image:height', content: '650', tagPriority: META_TAG_PRIORITY },
      { property: 'fb:app_id', content: '151261804904925', tagPriority: META_TAG_PRIORITY },
      { name: 'twitter:card', content: 'summary_large_image', tagPriority: META_TAG_PRIORITY },
      { name: 'twitter:site', content: '@gothamist', tagPriority: META_TAG_PRIORITY },
      { name: 'apple-itunes-app', content: 'app-id=470219771, app-argument=wnyc://', tagPriority: META_TAG_PRIORITY },
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
            slot-name="htlad-gothamist_index_leaderboard_1"
            layout="leaderboard"
          />
          <HtlAd
            v-else
            slot-name="htlad-gothamist_interior_leaderboard_1"
            layout="leaderboard"
          />
        </div>
        <div class="leaderboard-container">
          <Transition name="fixed-header">
            <GothamistMainHeader
              v-if="fixedHeaderVisible && route.name !== 'sectionSlug-articleSlug'"
              class="fixed-header"
              :navigation="navigation"
              :is-minimized="true"
              :donate-url-base="config.public.donateUrlBase"
              utm-campaign="homepage-header"
            />
          </Transition>
          <div id="article-header" />
        </div>
      </div>
      <main class="main">
        <GothamistMainHeader
          :navigation="navigation"
          :is-minimized="route.name !== 'index'"
          :donate-url-base="config.public.donateUrlBase"
          utm-campaign="homepage-header"
          @visible="() => { fixedHeaderVisible = false }"
          @not-visible="() => { fixedHeaderVisible = true }"
        />
        <div class="breaking-news-wrapper">
          <BreakingNews
            v-if="breakingNews.length"
            :title="breakingNews[0].title"
            :link="breakingNews[0].link"
            :callout-text="breakingNews[0].description"
          />
        </div>
        <slot />
      </main>
      <gothamist-footer :navigation="navigation" />
      <audio-player />
    </div>
  </div>
  <Sidebar
    v-model:visible="sidebarOpen"
    :base-z-index="6000"
    position="right"
    data-style-mode="dark"
    aria-close-label="close the navigation menu"
    class="gothamist-sidebar px-3 md:px-4"
    @show="handleSidebarShown"
    @hide="handleSidebarHidden"
    @keydown.esc="closeSidebar"
    @keydown.tab="handleSidebarTab"
    @keydown.shift.tab="handleSidebarShiftTab"
  >
    <template #header>
      <div class="gothamist-sidebar-header flex md:hidden">
        <VFlexibleLink to="/" raw @click="trackSidebarClick('sidebar logo')">
          <LogoGothamist class="gothamist-sidebar-header-logo pr-2" />
        </VFlexibleLink>
        <div class="gothamist-sidebar-header-tagline" v-html="strapline" />
      </div>
    </template>
    <template #default>
      <LoadLazily
        :options="{
          root: null,
          rootMargin: '0px',
          threshold: 0,
        }"
      >
        <LazyGothamistSidebarContents
          :navigation="navigation"
          :donate-url-base="config.public.donateUrlBase"
          utm-campaign="goth_hamburger"
          class="mt-3"
          @menu-list-click="trackSidebarClick($event)"
        />
      </LoadLazily>
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

.breaking-news-wrapper {
  width: 100%;
  max-width: 1400px;
  padding: 1rem 2.5rem;
  @include media('<lg') {
    padding: 1rem 1.5rem;
  }
}

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
