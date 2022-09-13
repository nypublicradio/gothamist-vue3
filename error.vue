<script setup lang="ts">
import VFlexibleLink from '@nypublicradio/nypr-design-system-vue3/v2/src/components/VFlexibleLink.vue'
import { ref, onMounted } from 'vue'
import { useRuntimeConfig } from '#app'
import { useSidebarIsOpen } from '~~/composables/states.js'

const config = useRuntimeConfig()
const route = useRoute()
const { $htlbid, $analytics } = useNuxtApp()
const atTop = ref(true)
const strapline = await useStrapline()

const props = defineProps({
  error: {
    type: Object,
    default: {},
  },
})

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
const closeSidebar = () => (sidebarOpen.value = false)

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
</script>
<template>
  <div class="error-page">
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
        <Meta name="og:image" :content="config.OG_IMAGE" />
        <Meta name="og:locale" content="en_US" />
        <Meta name="og:image:width" content="1200" />
        <Meta name="og:image:height" content="650" />
        <Meta name="fb:app_id" content="151261804904925" />
        <Meta name="twitter:card" content="summary_large_image" />
        <Meta name="twitter:site" content="@gothamist" />
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
      :showLogo="route.name !== 'index'"
      :donateUrlBase="config.donateUrlBase"
      utmCampaign="goth_header"
    />
    <Sidebar
      v-model:visible="sidebarOpen"
      :baseZIndex="6000"
      position="right"
      data-style-mode="dark"
      class="gothamist-sidebar px-3 md:px-4"
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
    <scroll-to-top-button />
    <gothamist-footer :navigation="navigation" />
  </div>
</template>

<style lang="scss">
.error-page {
  background: linear-gradient(
    180deg,
    #f3f3e4 0,
    rgba(255, 255, 255, 0) 720px,
    rgba(255, 255, 255, 0) 100%
  );
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
