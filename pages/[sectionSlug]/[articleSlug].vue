<script setup lang="ts">
import { onMounted } from 'vue'
import VImageWithCaption from '@nypublicradio/nypr-design-system-vue3/v2/src/components/VImageWithCaption.vue'
import VTag from '@nypublicradio/nypr-design-system-vue3/v2/src/components/VTag.vue'
import { ArticlePage, GalleryPage } from '../../composables/types/Page'
import { normalizeGalleryPage } from '~~/composables/data/galleryPages'

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

const trackingData = useArticlePageTrackingData(article)
const adTargetingData = useArticlePageAdTargetingData(article)
const sensitiveContent = useSensitiveContent()
const headMetadata = useArticlePageHeadMetadata(article)

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
  //emitted newsletter submit event, @Matt, not exactly sure how to get this work like you mentioned.
  // sendEvent('click_tracking', {
  //   event_category: 'Click Tracking',
  //   component: 'Footer',
  //   event_label: 'Become a member',
  // })
}
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
            <byline class="mb-3" :article="article" />
            <div>
              <div id="pinned-newsletter" style="min-width: 300px">
                <hr class="black mb-4" />
                <newsletter-article
                  class="pb-8"
                  triggerID="pinned-newsletter"
                  pinEndTriggerID="article-recirculation"
                  @submit="newsletterSubmitEvent"
                />
              </div>
            </div>
          </div>
          <div class="col overflow-hidden" v-if="article">
            <div class="mb-4 xxl:mb-6">
              <v-image-with-caption
                loading="eager"
                :image="useImageUrl(topImage)"
                :imageUrl="article.imageLink"
                :width="728"
                :height="485"
                :alt-text="topImage.alt"
                :maxWidth="topImage.width"
                :maxHeight="topImage.height"
                :credit="topImage.credit && `Photo by ${topImage.credit}`"
                :credit-url="topImage.creditLink"
                :sizes="[1, 2]"
                :ratio="[3, 2]"
                :caption="topCaption"
              />
            </div>
            <div class="block xxl:hidden mb-5">
              <byline :article="article" />
              <!-- <newsletter-home
                @submit="newsletterSubmitEvent"
                small
                :showBlurb="false"
              /> -->
            </div>
            <article-donation-CTA />
            <v-streamfield
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
            <p class="type-fineprint">Powered by members and sponsors</p>
          </div>
        </div>
      </div>
    </section>
    <section>
      <div class="content">
        <div class="grid gutter-x-30">
          <div class="col-fixed hidden xxl:block"></div>
          <div class="col">
            <article-footer v-if="article" :article="article" />
          </div>
        </div>
        <article-recirculation
          id="article-recirculation"
          class="my-6"
          :article="article"
        />
        <div class="mt-6 mb-5">
          <hr class="black mb-4" />
          <newsletter-home @submit="newsletterSubmitEvent" />
        </div>
      </div>
    </section>
  </div>
</template>

<style lang="scss">
.sectionSlug-articleSlug {
  .top-section {
    background: var(--soybean200);
    background: -moz-linear-gradient(
      top,
      var(--soybean200) 17%,
      var(--white) 100%
    );
    background: -webkit-linear-gradient(
      top,
      var(--soybean200) 17%,
      var(--white) 100%
    );
    background: linear-gradient(
      to bottom,
      var(--soybean200) 17%,
      var(--white) 100%
    );
    background-size: 100% 720px !important;
    background-repeat: no-repeat !important;
  }
  .v-tag .p-button {
    background: transparent;
  }
  .col-fixed {
    width: 100%;
    max-width: $col-fixed-width-330;
  }
}
</style>
