<script setup lang="ts">
import VFlexibleLink from '@nypublicradio/nypr-design-system-vue3/v2/src/components/VFlexibleLink.vue'
import VShareTools from '@nypublicradio/nypr-design-system-vue3/v2/src/components/VShareTools.vue'
import VShareToolsItem from '@nypublicradio/nypr-design-system-vue3/v2/src/components/VShareToolsItem.vue'
const { $analytics } = useNuxtApp()

const props = defineProps({
  title: {
    type: String,
    default: '',
  },
  progress: {
    type: Number,
    default: 0,
  },
  donateUrlBase: {
    type: String,
    required: true,
  },
  utmCampaign: {
    type: String,
    required: true,
  },
  shareUrl: {
    type: String,
    default: '',
  },
  shareTitle: {
    type: String,
    default: '',
  },
})
const sidebarIsOpen = useSidebarIsOpen()
const sidebarOpenedFrom = useSidebarOpenedFrom()
const strapline = useStrapline()
const progressPercentage = computed(() => `${props.progress}%`)
const openSidebar = (e) => {
  sidebarIsOpen.value = true
  sidebarOpenedFrom.value = e.target
}
</script>

<template>
  <header class="article-page-header">
    <section class="article-page-header-progress">
      <div
        class="article-page-header-contents content py-0 my-3 flex align-items-center justify-content-between"
      >
        <div class="article-page-header-left">
          <v-flexible-link to="/" raw>
            <LogoGothamist class="article-page-header-logo" />
          </v-flexible-link>
          <div class="article-page-header-tagline hidden" v-html="strapline" />
        </div>
        <div class="article-page-header-center hidden h6 md:block px-4">
          {{ title }}
        </div>
        <div class="article-page-header-right flex justify-content-end">
          <v-share-tools class="hidden lg:flex mx-3">
            <v-share-tools-item
              action="share"
              service="facebook"
              :url="shareUrl"
              :utm-parameters="{
                medium: 'social',
                source: 'facebook',
                campaign: 'shared_facebook',
              }"
              @share="
                $analytics.sendEvent('click_tracking', {
                  event_category: 'Click Tracking',
                  component: 'Article Page Header',
                  event_label: 'Social Share Facebook',
                })
              "
            />

            <v-share-tools-item
              action="share"
              service="twitter"
              :url="shareUrl"
              :share-parameters="{ text: shareTitle, via: 'gothamist' }"
              :utm-parameters="{
                medium: 'social',
                source: 'twitter',
                campaign: 'shared_twitter',
              }"
              @share="
                $analytics.sendEvent('click_tracking', {
                  event_category: 'Click Tracking',
                  component: 'Article Page Header',
                  event_label: 'Social Share Twitter',
                })
              "
            />
            <v-share-tools-item
              action="share"
              service="reddit"
              :url="shareUrl"
              :share-parameters="{ title: shareTitle }"
              :utm-parameters="{
                medium: 'social',
                source: 'reddit',
                campaign: 'shared_reddit',
              }"
              @share="
                $analytics.sendEvent('click_tracking', {
                  event_category: 'Click Tracking',
                  component: 'Article Page Header',
                  event_label: 'Social Share Reddit',
                })
              "
            />
            <v-share-tools-item
              action="share"
              service="email"
              :url="shareUrl"
              :share-parameters="{ body: shareTitle + ' - %URL%' }"
              :utm-parameters="{
                medium: 'social',
                source: 'email',
                campaign: 'shared_email',
              }"
              @share="
                $analytics.sendEvent('click_tracking', {
                  event_category: 'Click Tracking',
                  component: 'Article Page Header',
                  event_label: 'Social Share Email',
                })
              "
            />
          </v-share-tools>
          <a
            class="article-page-header-donate-button mod-button p-component p-button p-button-rounded mr-2"
            :href="`${donateUrlBase}&utm_campaign=${utmCampaign}`"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span class="p-button-label">Donate</span>
          </a>
          <Button
            icon="pi pi-bars"
            class="p-button p-component p-button-icon-only p-button-text p-button-rounded -mr-2"
            aria-label="Open the navigation menu"
            aria-expanded="false"
            @click="openSidebar"
          />
        </div>
      </div>
    </section>
  </header>
</template>

<style lang="scss">
.article-page-header {
  width: 100%;
  height: 68px;
  position: fixed;
  z-index: 1000;
  top: 50px;
  background: white;
  @include media('>md') {
    top: 0px;
  }
}
.article-page-header-progress {
  --progressPercentage: v-bind(progressPercentage);
  background: linear-gradient(
    90deg,
    #000000,
    var(--progressPercentage),
    #000000,
    var(--progressPercentage),
    #ffffff
  );
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 68px;
}

.article-page-header-contents * {
  mix-blend-mode: difference;
  --text-color: white;
  --button-bg: #ffffff;
  --button-hover-bg: #cccccc;
  --button-hover-border-color: #cccccc;
  --button-active-bg: #aaaaaa;
  --button-text-color: #000000;
  --button-text-hover-color: #000000;
  --button-text-active-color: #000000;
  --button-text-disabled-color: #000000;

  color: var(--text-color);
}

.article-page-header-contents svg > * {
  fill: var(--text-color);
}

.article-page-header-left {
  //min-width: 180px;
}

.article-page-header-right {
  min-width: 135px;
  @include media('>lg') {
    min-width: 280px;
  }
}

.article-page-header-logo {
  width: auto;
  height: 34px;
  @include media('<xs') {
    height: 25px;
    align-self: center;
  }
}

.article-page-header-center {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.article-page-header-donate-button {
  max-height: 36px;
  transform: translate3d(0, 0, 0);
  @include media('<xs') {
    font-size: 0.875rem;
    padding: 8.75px 13.125px;
  }
}
</style>
