<script setup lang="ts">
  import VFlexibleLink from '@nypublicradio/nypr-design-system-vue3/v2/src/components/VFlexibleLink.vue'
import VShareTools from '@nypublicradio/nypr-design-system-vue3/v2/src/components/VShareTools.vue'
import VShareToolsItem from '@nypublicradio/nypr-design-system-vue3/v2/src/components/VShareToolsItem.vue'
  const { $analytics } = useNuxtApp()
  
  const props = defineProps({
    title: {
      type: String,
      default: ''
    },
    progress: {
      type: Number,
      default: 0
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
      default: ''
    },
    shareTitle: {
      type: String,
      default: ''
    },
  })
  const sidebarIsOpen = useSidebarIsOpen()
  const progressPercentage = computed(() => `${props.progress}%`)
  const openSidebar = () => { sidebarIsOpen.value = true }
</script>

<template>
<header class="article-page-header">
  <div class="article-page-header-progress">
    <div class="article-page-header-contents py-3 px-4 md:px-5 flex align-items-center justify-content-between">
      <div class="article-page-header-left">
        <v-flexible-link to="/" raw>
          <LogoGothamist class="article-page-header-logo" />
        </v-flexible-link>
        <div class="article-page-header-tagline hidden">News for New Yorkers</div>
      </div>
      <div class="article-page-header-center hidden h6 md:block px-4">
        {{title}}
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
        <v-flexible-link :to="`${donateUrlBase}&utm_campaign=${utmCampaign}`" raw class="pr-2">
            <Button class="article-page-header-donate-button p-button-rounded"> 
                <span class="p-button-label">Donate</span>
            </Button>
        </v-flexible-link>
        <Button icon="pi pi-bars" class="p-button p-component p-button-icon-only p-button-text p-button-rounded -mr-2" @click="openSidebar" />
      </div>
    </div>
  </div>
</header>
</template>

<style lang="scss">
.article-page-header {
  width: 100%;
  height: 68px;
  position: fixed;
  z-index: 1000;
  top: 116px;
  background: white;
  @include media('>md') {
    top: 0px;
  }
}
.article-page-header-progress {
  --progressPercentage: v-bind(progressPercentage);
  background: linear-gradient(90deg, #000000, var(--progressPercentage), #000000, var(--progressPercentage),  #ffffff);
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
  min-width: 180px;
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
}

.article-page-header-center {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.article-page-header-donate-button {
    max-height: 36px;
}

</style>