<script setup lang="ts">
import VFlexibleLink from '@nypublicradio/nypr-design-system-vue3/v2/src/components/VFlexibleLink.vue'

defineProps({
  error: {
    type: Object,
    default: {},
  },
})
const config = useRuntimeConfig()
const route = useRoute()
const { $htlbid, $analytics } = useNuxtApp()

const navigationState = useNavigation()
const navigationPromise = findNavigation().then(({ data }) => {
  const navigationData = normalizeFindNavigationResponse(data)
  navigationState.value = navigationData
  return navigationData
})

const [navigation] = await Promise.all([
  navigationPromise,
])

const atTop = ref(true)
const strapline = useStrapline()
const sensitiveContent = useSensitiveContent()
const fixedHeaderVisible = useFixedHeaderVisible()
const sidebarOpen = useSidebarIsOpen()
const sidebarOpenedFrom = useSidebarOpenedFrom()
function closeSidebar() {
  sidebarOpen.value = false
}
let sidebarElements, firstElement, lastElement

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

function handleSidebarShown() {
  sidebarElements = Array.from(
    document.querySelectorAll(
      '.p-sidebar a:not([disabled]), .p-sidebar button:not([disabled])',
    ),
  ).filter(element => element.clientWidth + element.clientHeight !== 0)
  firstElement = sidebarElements[0]
  lastElement = sidebarElements[sidebarElements.length - 1]
}

function trackSidebarClick(label) {
  // emitted mobile menu click event
  $analytics.sendEvent('click_tracking', {
    event_category: 'Click Tracking - Mobile Menu',
    component: 'header',
    event_label: label,
  })
  closeSidebar()
}

onBeforeMount(() => {
  const currentSteamStation = useCurrentSteamStation()
  updateLiveStream(currentSteamStation.value)
})
onMounted(() => {
  $analytics.sendPageView({ page_type: 'error_page' })
  document.addEventListener('scroll', () => {
    atTop.value = !(window.scrollY > 0)
    // atBottom.value = ((window.scrollY + (window.innerHeight + 115) >= document.body.scrollHeight)) ? true : false
  })
  $htlbid.init()
  $htlbid.setTargeting({
    is_testing: config.public.HTL_IS_TESTING,
  })
  $htlbid.setTargetingForRoute(route)
})

watch(route, (value) => {
  $htlbid.setTargetingForRoute(value)
  $htlbid.clearAds()
})

function newsletterSubmitEvent() {
  $analytics.sendEvent('click_tracking', {
    event_category: 'Click Tracking - Footer - Newsletter',
    component: 'footer',
    event_label: 'Newsletter',
  })
}
useHead({
  htmlAttrs: {
    lang: 'en',
  },
  title: 'Gothamist: New York City Local News, Food, Arts & Events',
})
useServerHead({
  link: [
    { rel: 'preconnect', href: config.public.API_URL, crossorigin: '', tagPriority: 'high' },
    { rel: 'preconnect', href: config.public.IMAGE_CDN_URL, tagPriority: 'high' },
  ],
  meta: [
    { name: 'description', content: 'Gothamist is a website about New York City news, arts and events, and food, brought to you by New York Public Radio.' },
    { property: 'og:site_name', content: 'Gothamist' },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: `https://www.gothamist.com${route.fullPath}` },
    { property: 'og:title', content: 'Gothamist: New York City Local News, Food, Arts & Events' },
    { property: 'og:site_name', content: 'Gothamist' },
    { property: 'og:description', content: 'Gothamist is a non-profit local newsroom, powered by WNYC.' },
    { property: 'og:image', content: config.public.OG_IMAGE },
    { property: 'og:locale', content: 'en_US' },
    { property: 'og:image:width', content: '1200' },
    { property: 'og:image:height', content: '650' },
    { property: 'fb:app_id', content: '151261804904925' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:site', content: '@gothamist' },
  ],
})
</script>

<template>
  <div class="error-page">
    <div v-if="!sensitiveContent" class="htlad-skin" />
    <div
      class="leaderboard-ad-wrapper flex justify-content-center align-items-center"
    >
      <div v-if="!sensitiveContent" class="htlad-index_leaderboard_1" />
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
      </div>
    </div>
    <GothamistMainHeader
      :navigation="navigation"
      :is-minimized="route.name !== 'index'"
      :donate-url-base="config.public.donateUrlBase"
      utm-campaign="goth_header"
      @visible="() => { fixedHeaderVisible = false }"
      @not-visible="() => { fixedHeaderVisible = true }"
    />
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
          <VFlexibleLink
            to="/"
            raw
            @click="trackSidebarClick('sidebar logo')"
          >
            <LogoGothamist class="gothamist-sidebar-header-logo pr-2" />
          </VFlexibleLink>
          <div class="gothamist-sidebar-header-tagline" v-html="strapline" />
        </div>
      </template>
      <template #default>
        <GothamistSidebarContents
          :navigation="navigation"
          :donate-url-base="config.public.donateUrlBase"
          utm-campaign="goth_hamburger"
          class="mt-3"
          @menuListClick="trackSidebarClick($event)"
        />
      </template>
    </Sidebar>
    <main>
      <section class="error-page-header">
        <div class="content">
          <div class="error-page-error pt-2">
            {{ error.statusCode }} Error - {{ error.statusMessage }}
          </div>
          <div v-if="config.public.DEBUG === 'true'" class="mt-4">
            <pre class="font-bold">{{ error.message }}</pre>
            <div v-html="error.description" />
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
          <article-recirculation tracking-component-location="Error Page Recirculation Module" />
          <!-- newsletter -->
          <div class="mt-8 mb-5">
            <hr class="black mb-4">
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
</style>
