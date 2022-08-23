<script setup lang="ts">
import { onMounted, computed } from 'vue'
import { useMediaQuery, useWindowScroll } from '@vueuse/core'
import VImageWithCaption from '@nypublicradio/nypr-design-system-vue3/v2/src/components/VImageWithCaption.vue'
import VTag from '@nypublicradio/nypr-design-system-vue3/v2/src/components/VTag.vue'
import { ArticlePage, GalleryPage } from '../../composables/types/Page'
import { normalizeGalleryPage } from '~~/composables/data/galleryPages'
import VFlexibleLink from '@nypublicradio/nypr-design-system-vue3/v2/src/components/VFlexibleLink.vue'

const route = useRoute()
const { $analytics, $htlbid } = useNuxtApp()
const article = (await findPage(
  `${route.params.sectionSlug}/${route.params.articleSlug}`
).then(({ data }) => normalizeFindPageResponse(data))) as ArticlePage

let gallery
if (article.leadGallery) {
  gallery = (await usePageById(article.leadGallery.gallery).then(({ data }) =>
    normalizeGalleryPage(data.value)
  )) as GalleryPage
}

const topImage = article.leadImage || gallery.slides[0].image
const topCaption = article.leadImageCaption || gallery?.slides[0].image.title
const galleryLength = gallery?.slides.length || 0
const config = useRuntimeConfig()
const trackingData = useArticlePageTrackingData(article)
const adTargetingData = useArticlePageAdTargetingData(article)
const sensitiveContent = useSensitiveContent()
const headMetadata = useArticlePageHeadMetadata(article)
const { y: scrollY } = useWindowScroll()
const isMediumOrUpScreen = useMediaQuery(`(min-width: 768px)`)
// maybe these values should be calculated automatically by measuring on the position of the main header
// or something instead of hardcoding them here, but this works for now
const showHeaderAfter = computed(() => isMediumOrUpScreen.value ? 374 : 68)
const showHeader = computed(() => scrollY.value > showHeaderAfter.value)

useHead(headMetadata)

onMounted(() => {
  $analytics.sendPageView(trackingData)
  $htlbid.setTargeting(adTargetingData)
  sensitiveContent.value = article.sensitiveContent
})

onUnmounted(() => {
  $htlbid.clearTargeting(adTargetingData)
  sensitiveContent.value = false
})

// handle ads when the article is mounted
function handleArticleMounted(el) {
  const landmarks = useStreamfieldLandmarks(el.value)
  const adTarget = landmarks[Math.min(landmarks.length - 1, 5)].node
  useInsertAd(adTarget)
}

// insert ads into the target element
function useInsertAd(targetElement) {
  const sensitiveContent = useSensitiveContent()
  if (article && !sensitiveContent.value) {
    const adDiv = document.createElement('DIV')
    adDiv.classList.add(
      'htlad-interior_midpage_1',
      'ad-div',
      'mod-break-margins',
      'mod-ad-disclosure',
      'mb-5'
    )
    useInsertAfterElement(adDiv, targetElement)
  }
}

const newsletterSubmitEvent = (e) => {
  $analytics.sendEvent('click_tracking', {
    event_category: `Click Tracking - ${e} - Newsletter`,
    component: e,
    event_label: 'Newsletter',
  })
}

const getGalleryLink = computed(() => {
  return gallery.url.replace(/^https:\/\/[^/]*/, '')
})
</script>

<template>
  <div>
    <Head>
      <Script
        v-if="article"
        type="application/ld+json"
        :children="JSON.stringify(useArticlePageStructuredData(article))"
      />
      <Link rel="canonical" v-if="article" :href="article.url" />
    </Head>
    <ScrollTracker
      scrollTarget=".article-body"
      v-slot="scrollTrackerProps"
    >
      <ArticlePageHeader
        :class="`article-page-header ${showHeader ? '' : 'js-hidden'}`"
        :donateUrlBase="config.donateUrlBase"
        utmCampaign="goth_header"
        :progress="scrollTrackerProps.scrollPercentage"
        :title="article?.title"
        :shareUrl="article.url"
        :shareTitle="article.socialTitle"
      />
    </ScrollTracker>
    <section class="top-section" v-if="article">
      <div class="content">
        <div class="grid gutter-x-30">
          <div class="col-fixed hidden xxl:block"></div>
          <div class="col">
            <v-tag
              :name="article.section.name"
              :slug="`/${article.section.slug}`"
            />
            <h2 class="mt-4 mb-3">{{ article.title }}</h2>
          </div>
          <div class="col-fixed hidden lg:block"></div>
        </div>
        <div class="grid gutter-x-30">
          <div class="col-fixed hidden xxl:block">
            <hr class="black" />
            <byline class="mb-3 pt-4" :article="article" />
            <div>
              <div id="pinned-newsletter" style="min-width: 300px">
                <hr class="black mb-4" />
                <newsletter-article
                  class="pb-8"
                  triggerID="pinned-newsletter"
                  pinEndTriggerID="pinned-newsletter-end"
                  @submit="newsletterSubmitEvent('pinned')"
                />
              </div>
            </div>
          </div>
          <div class="col overflow-hidden" v-if="article">
            <div class="mb-4 xxl:mb-6 relative">
              <v-image-with-caption
                loading="eager"
                :image="useImageUrl(topImage)"
                :imageUrl="article.imageLink"
                :width="728"
                :height="485"
                :alt-text="topImage?.alt"
                :maxWidth="topImage?.width"
                :maxHeight="topImage?.height"
                :credit="topImage?.credit && `Photo by ${topImage?.credit}`"
                :credit-url="topImage?.creditLink"
                :sizes="[1, 2]"
                :ratio="[3, 2]"
                :caption="topCaption"
              />
              <v-flexible-link
                v-if="gallery"
                class="view-gallery-button"
                :to="getGalleryLink"
                raw
              >
                <Button
                  class="p-button-rounded p-button-sm p-button-raised p-button-secondary"
                  :label="`View all (${galleryLength})`"
                />
              </v-flexible-link>
            </div>
            <div class="block xxl:hidden mb-5">
              <hr class="black" />
              <byline class="pt-4" :article="article" />
              <hr class="mt-3 mb-5" />
            </div>
            <article-donation-CTA :donateUrlBase="$config.donateUrlBase" utmCampaign="article-top" />
            <v-streamfield
              class="article-body"
              :streamfield-blocks="article.body"
              @all-blocks-mounted="handleArticleMounted"
            />
          </div>
          <div class="col-fixed hidden lg:block">
            <!-- <div class="htlad-index_rectangle_1" /> -->
            <img
              src="https://fakeimg.pl/300x250/?text=AD Here"
              style="width: 100%; max-width: 300px"
              width="300"
              height="250"
              alt="advertisement"
            />
            <p class="type-fineprint">
              Gothamist is funded by sponsors and member donations
            </p>
          </div>
        </div>
      </div>
    </section>
    <section>
      <div id="pinned-newsletter-end" class="content">
        <div class="grid gutter-x-30">
          <div class="col-fixed hidden xxl:block"></div>
          <div class="col">
            <article-footer v-if="article" :article="article" />
          </div>
        </div>
        <hr class="black" />
        <p class="type-label3 mt-2 mb-4">MORE {{ article.section.slug }}</p>
        <article-recirculation
          :slug="String(route.params.sectionSlug)"
          :article="article"
        />
        <div class="mt-6 mb-5">
          <hr class="black mb-4" />
          <newsletter-home @submit="newsletterSubmitEvent('footer')" />
        </div>
      </div>
    </section>
  </div>
</template>

<style lang="scss">
.page.sectionSlug-articleSlug {
  background: linear-gradient(
    180deg,
    #f3f3e4 0,
    rgba(255, 255, 255, 0) 720px,
    rgba(255, 255, 255, 0) 100%
  );
  .v-tag .p-button {
    background: transparent;
    &:hover {
      background: var(--tag-hover-bg);
    }
  }
  .col-fixed {
    width: 100%;
    max-width: $col-fixed-width-330;
  }

  .view-gallery-button {
    position: absolute;
    top: 1rem;
    right: 1rem;
    .p-button {
      background: #ffffff;
      &:hover {
        background: map-get($colors, 'soybeanhover');
      }
    }
  }

 .article-page-header {
    transition: opacity 0.4s ease-in;
  }
  .article-page-header.js-hidden {
    visibility: hidden;
    opacity: 0;
    transition: opacity 0.4s ease-in, visibility 0s 0.4s;
  }
}
</style>
