<script setup lang="ts">
import { onMounted, computed } from 'vue'
import VImageWithCaption from '@nypublicradio/nypr-design-system-vue3/v2/src/components/VImageWithCaption.vue'
import VTag from '@nypublicradio/nypr-design-system-vue3/v2/src/components/VTag.vue'
import { ArticlePage, GalleryPage } from '../../composables/types/Page'
import { normalizeGalleryPage } from '~~/composables/data/galleryPages'
import VFlexibleLink from '@nypublicradio/nypr-design-system-vue3/v2/src/components/VFlexibleLink.vue'

/* preview */
import {
  usePreviewData,
  useIsArticlePage,
  useMarketingBannerData,
} from '~/composables/states'
const isArticlePage = useIsArticlePage()
const previewData = usePreviewData()
const marketingBannerData = useMarketingBannerData()
const route = useRoute()
const isPreview = route.query.preview ? true : false
/* preview */

const config = useRuntimeConfig()
const { $analytics, $htlbid } = useNuxtApp()
const article = isPreview
  ? previewData.value.data
  : ((await findPage(
      `${route.params.sectionSlug}/${route.params.articleSlug}`
    ).then(({ data }) => normalizeFindPageResponse(data))) as ArticlePage)

//console.log('article = ', article)

let gallery
if (article.leadGallery) {
  gallery = (await usePageById(article.leadGallery.gallery).then(({ data }) =>
    normalizeGalleryPage(data.value)
  )) as GalleryPage
}

const topImage = article.leadImage || gallery?.slides?.[0]?.image || null
const topCaption =
  article.leadImageCaption ||
  topImage?.caption ||
  gallery?.slides?.[0]?.image.caption ||
  null
const galleryLength = gallery?.slides?.length || 0

const trackingData = useArticlePageTrackingData(article)
const adTargetingData = useArticlePageAdTargetingData(article)
const sensitiveContent = useSensitiveContent()
const headMetadata = useArticlePageHeadMetadata(article)

useHead(headMetadata)

onBeforeMount(() => {
  isArticlePage.value = true
})
onMounted(() => {
  $analytics.sendPageView(trackingData)
  $htlbid.setTargeting(adTargetingData)
  sensitiveContent.value = article.sensitiveContent
  useUpdateCommentCounts([article])

  //TEMP mock AD change with different height
  /*   setTimeout(() => {
    var ad = document.querySelectorAll('.htl-ad')
    ad[0].style.height = '500px'
  }, 4000) */
})

onUnmounted(() => {
  $htlbid.clearTargeting(adTargetingData)
  sensitiveContent.value = false
  isArticlePage.value = false
})

// handle ads when the article is mounted
function handleArticleMounted(el) {
  let landmarks = useStreamfieldLandmarks(el.value)
  do {
    const adTarget = landmarks[Math.min(landmarks.length - 1, 5)].node
    useInsertAd(adTarget)
    landmarks = landmarks.slice(6)
  } while (landmarks.length > 6)
}

// insert ads into the target element
function useInsertAd(targetElement) {
  if (article && !article.sensitiveContent) {
    const adDiv = document.createElement('DIV')
    adDiv.classList.add(
      'htlad-gothamist_interior_midpage_repeating',
      'wide-module',
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
    <HeaderScrollTrigger header-class="article-page-header">
      <ScrollTracker scrollTarget=".article-body" v-slot="scrollTrackerProps">
        <ArticlePageHeader
          class="article-page-header"
          :donateUrlBase="config.donateUrlBase"
          utmCampaign="goth_header"
          :progress="scrollTrackerProps.scrollPercentage"
          :title="article?.title"
          :shareUrl="article.url"
          :shareTitle="article.socialTitle"
        />
      </ScrollTracker>
    </HeaderScrollTrigger>
    <section class="top-section" v-if="article">
      <div class="content">
        <div class="grid gutter-x-30">
          <div class="col-fixed hidden xxl:block"></div>
          <div class="col">
            <v-tag
              v-if="article?.section"
              :name="article.section.name"
              :slug="`/${article.section.slug}`"
            />
            <h1 class="mt-4 mb-3 h2">{{ article.title }}</h1>
          </div>
          <div class="col-fixed hidden lg:block"></div>
        </div>
        <div class="grid gutter-x-30">
          <div class="col-fixed hidden xxl:block">
            <hr class="black" />
            <byline class="mb-3 pt-4" :article="article" />
            <div>
              <div id="pinned-newsletter" style="min-width: 300px">
                <hr class="mb-4" />
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
                v-if="topImage"
                loading="eager"
                :image="useImageUrl(topImage)"
                :imageUrl="article.imageLink"
                :width="728"
                :height="485"
                :alt-text="topImage?.alt"
                :maxWidth="topImage?.width"
                :maxHeight="topImage?.height"
                :credit="topImage?.credit"
                :credit-url="topImage?.creditLink"
                :sizes="[2]"
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
                  :label="`View all ${galleryLength}`"
                />
              </v-flexible-link>
            </div>
            <div class="block xxl:hidden mb-5">
              <hr class="black" />
              <byline class="pt-4" :article="article" />
              <hr class="mt-3 mb-5" />
            </div>

            <article-donation-marketing-CTA
              v-if="marketingBannerData.product_banners.length > 0"
              :data="marketingBannerData"
            />
            <article-donation-CTA
              :donateUrlBase="config.donateUrlBase"
              utmCampaign="article-top"
            />
          </div>
          <div class="col-fixed hidden lg:block">
            <HtlAd
              layout="rectangle"
              slot="htlad-gothamist_interior_rectangle_topper"
              fineprint="Gothamist is funded by sponsors and member donations"
            />
          </div>
        </div>
        <div class="grid gutter-x-30">
          <div class="col-fixed hidden xxl:block"></div>
          <div class="col overflow-hidden article-column">
            <v-streamfield
              class="article-body"
              :streamfield-blocks="article.body"
              @all-blocks-mounted="handleArticleMounted"
            />
            <article-donation-marketing-bottom-CTA
              v-if="marketingBannerData.product_banners.length > 0"
              class="below-body"
              :data="marketingBannerData"
            />
          </div>
        </div>
      </div>
    </section>
    <section>
      <div id="pinned-newsletter-end" class="content">
        <div class="grid gutter-x-30">
          <div class="col-fixed hidden xxl:block"></div>
          <div class="col w-full">
            <article-footer :article="article" />
          </div>
        </div>
        <hr class="black" />
        <p
          role="heading"
          aria-level="2"
          v-if="article?.section"
          class="type-label3 mt-2 mb-4"
        >
          MORE {{ article.section.slug }}
        </p>
        <article-recirculation
          :slug="(route?.params?.sectionSlug as string)"
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
        background: var(--soybeanHover);
      }
    }
  }

  @include media('>lg') {
    .article-body > * {
      flex-grow: 1;
      flex-basis: 0;
      padding: 0.5rem;
      width: calc(100% - 330px - 15px);
    }
    .article-body > *.rte-text {
      width: 100%;
    }
    .article-body > *.rte-text > * {
      width: calc(100% - 330px - 15px);
    }
    .article-body > *.wide-module,
    .article-body > streamfield-pull-quote,
    .article-body > streamfield-pull-quote-author,
    .article-body > *.rte-text > *.wide-module {
      width: 100%;
    }
    .below-body {
      width: calc(100% - 330px - 15px);
    }
  }
}
</style>
