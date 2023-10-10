<script setup lang="ts">
import { computed, onMounted } from 'vue'
import VImageWithCaption from '@nypublicradio/nypr-design-system-vue3/v2/src/components/VImageWithCaption.vue'
import VTag from '@nypublicradio/nypr-design-system-vue3/v2/src/components/VTag.vue'
import VFlexibleLink from '@nypublicradio/nypr-design-system-vue3/v2/src/components/VFlexibleLink.vue'
import type { ArticlePage, GalleryPage } from '../../composables/types/Page'
import { normalizeGalleryPage } from '~~/composables/data/galleryPages'

/* preview */
const previewData = usePreviewData()
const route = useRoute()
const isPreview = !!route.query.preview
/* preview */

const config = useRuntimeConfig()
const { $analytics, $htlbid } = useNuxtApp()
const article = isPreview
  ? previewData.value.data as ArticlePage
  : ((await findPage(
      `${route.params.sectionSlug}/${route.params.articleSlug}`,
    ).then(({ data }) => normalizeFindPageResponse(data),
    ).catch(() => {
      throw createError({
        statusCode: 404,
        statusMessage: 'Page Not Found',
        fatal: true,
      })
    })) as ArticlePage)

let gallery
if (article.leadGallery) {
  gallery = (await usePageById(article.leadGallery.gallery).then(({ data }) =>
    normalizeGalleryPage(data.value),
  )) as GalleryPage
}

const topImage = article.leadImage ?? gallery?.slides?.[0]?.image ?? null
const topCaption
  = article.leadImageCaption
  ?? topImage?.caption
  ?? gallery?.slides?.[0]?.image.caption
  ?? null
const galleryLength = gallery?.slides?.length ?? 0

const trackingData = useArticlePageTrackingData(article)
const adTargetingData = useArticlePageAdTargetingData(article)
const sensitiveContent = useSensitiveContent()
const fixedHeaderVisible = useFixedHeaderVisible()
const headMetadata = useArticlePageHeadMetadata(article)
const sectionSlug = computed(() => route?.params?.sectionSlug as string)
const contentLocked = ref(false) // starts unlocked for ssr, we check content wall state during onMounted hook
const isMounted = ref(false)

useHead({
  title: `${article.seoTitle} - Gothamist`,
})
if (article.preventSearchIndexing) {
  useServerHead({
    meta: [{ name: 'robots', content: 'noindex' }],
  })
}

useServerHead(headMetadata)
if (topImage) {
  usePreloadResponsiveImage(
    useImageUrl(topImage, {
      width: 700,
      height: 467,
      quality: 70,
    }),
    useResponsiveSrcset(topImage, [2, 3], {
      width: 700,
      height: 467,
      quality: 70,
    }),
  )
}
useChartbeat({
  sections: article.tags.map(tag => tag.name).join(','),
  authors: article.authors.map(author => author.name).join(','),
})
useOptinMonster()

onMounted(() => {
  $analytics.sendPageView(trackingData)
  $htlbid.setTargeting(adTargetingData)
  sensitiveContent.value = article.sensitiveContent
  useUpdateCommentCounts([article])
  contentLocked.value = useWalledState(article)
  isMounted.value = true
})

onUnmounted(() => {
  $htlbid.clearTargeting(adTargetingData)
  sensitiveContent.value = false
})

// handle ads when the article is mounted
function handleArticleMounted(el) {
  const element = el.value
  let landmarks = useStreamfieldLandmarks(element)
  do {
    const adTarget = landmarks[Math.min(landmarks.length - 1, 5)].node
    useInsertAd(adTarget)
    landmarks = landmarks.slice(6)
  } while (landmarks.length > 6)

  Array.from(element.querySelectorAll('[data-optin-monster-id]')).forEach((div: HTMLElement) => {
    if (div.parentElement)
      div.parentElement.id = div.dataset.optinMonsterId
  })
}

// insert ads into the target element
function useInsertAd(targetElement) {
  if (article && !article.sensitiveContent) {
    const adDiv = document.createElement('DIV')
    adDiv.classList.add(
      'htlad-gothamist_interior_midpage_repeating',
      'wide-module',
      'mb-5',
    )
    useInsertAfterElement(adDiv, targetElement)
  }
}

function newsletterSubmitEvent(e) {
  $analytics.sendEvent('click_tracking', {
    event_category: `Click Tracking - ${e} - Newsletter`,
    component: e,
    event_label: 'Newsletter',
  })
}

function trackWallSeen() {
  $analytics.sendEvent('view_promotion', {
    creative_slot: 'article-registration-wall',
    location_id: '',
    promotion_name: `Registration Wall - ${article.title}`,
    creative_name: 'Archived_Story',
  })
}

function trackSignUp() {
  $analytics.sendEvent('select_promotion', {
    creative_slot: 'article-registration-wall',
    location_id: '',
    promotion_name: `Registration Wall - ${article.title}`,
    creative_name: 'Archived_Story',
  })
}

const getGalleryLink = computed(() => {
  return gallery.url.replace(/^https:\/\/[^/]*/, '')
})

const tagName = computed(() => article?.sponsoredContent ? 'Sponsored' : article?.section?.name)
const tagSlug = computed(() => article?.sponsoredContent ? '' : `/${article?.section?.slug}`)
</script>

<template>
  <div>
    <Teleport v-if="isMounted" name="teleport" to="#article-header">
      <ScrollTracker v-slot="scrollTrackerProps" scroll-target=".article-body">
        <Transition name="article-page-header">
          <ArticlePageHeader
            v-if="fixedHeaderVisible"
            class="article-page-header"
            :donate-url-base="config.public.donateUrlBase"
            utm-campaign="goth_header"
            :progress="scrollTrackerProps.scrollPercentage"
            :title="article?.title"
            :share-url="article.url"
            :share-title="article.socialTitle"
          />
        </Transition>
      </ScrollTracker>
    </Teleport>
    <section v-if="article" class="top-section">
      <div class="content">
        <div class="grid gutter-x-30">
          <div class="col-fixed hidden xxl:block" />
          <div class="col">
            <VTag
              v-if="tagName"
              :class="article?.sponsoredContent && 'sponsored'"
              :name="tagName"
              :slug="tagSlug"
            />
            <h1 class="mt-4 mb-3 h2">
              {{ article.title }}
            </h1>
          </div>
          <div class="col-fixed hidden lg:block" />
        </div>
        <div class="grid gutter-x-30">
          <div class="col-fixed hidden xxl:block">
            <hr class="black">
            <byline class="mb-3 pt-4" :article="article" />
            <div>
              <div id="pinned-newsletter" style="min-width: 300px">
                <hr class="mb-4">
                <newsletter-article
                  class="pb-8"
                  trigger-i-d="pinned-newsletter"
                  pin-end-trigger-i-d="pinned-newsletter-end"
                  @submit="newsletterSubmitEvent('pinned')"
                />
              </div>
            </div>
          </div>
          <div v-if="article" class="col overflow-hidden">
            <div class="mb-4 xxl:mb-6 relative">
              <VImageWithCaption
                v-if="topImage"
                loading="eager"
                :image="useImageUrl(topImage)"
                :image-url="article.imageLink"
                :width="700"
                :height="467"
                :alt-text="topImage?.alt"
                :max-width="topImage?.width"
                :max-height="topImage?.height"
                :credit="topImage?.credit"
                :credit-url="topImage?.creditLink"
                :sizes="[2, 3]"
                :ratio="[3, 2]"
                :caption="topCaption"
              />
              <VFlexibleLink
                v-if="galleryLength"
                class="view-gallery-button"
                :to="getGalleryLink"
                raw
              >
                <Button
                  class="p-button-rounded p-button-sm p-button-raised p-button-secondary"
                  :label="`View all ${galleryLength}`"
                />
              </VFlexibleLink>
            </div>
            <div class="block xxl:hidden mb-5">
              <hr class="black">
              <byline class="pt-4" :article="article" />
              <hr class="mt-3 mb-5">
            </div>
            <article-donation-CTA
              :donate-url-base="config.public.donateUrlBase"
              utm-campaign="article-top"
            />
          </div>
          <div class="col-fixed hidden lg:block">
            <HtlAd
              slot-name="htlad-gothamist_interior_rectangle_topper"
              layout="rectangle"
              fineprint="Gothamist is funded by sponsors and member donations"
            />
          </div>
        </div>
        <div class="grid gutter-x-30">
          <div class="col-fixed hidden xxl:block" />
          <div class="col overflow-hidden article-column">
            <GothamistWalledArticle
              v-if="contentLocked"
              :article="article"
              @sign-up="trackSignUp"
              @wall-seen="trackWallSeen"
            />
            <v-streamfield
              v-else
              class="article-body"
              :streamfield-blocks="article.body"
              @all-blocks-mounted="handleArticleMounted"
            />
            <LoadLazily v-if="article.relatedLinks?.length">
              <LazyRelatedLinks
                :article="article"
                class="below-body"
                tracking-component-location="Article Page Related Links"
              />
            </LoadLazily>
          </div>
        </div>
      </div>
    </section>
    <section>
      <div id="pinned-newsletter-end" class="content">
        <div class="grid gutter-x-30">
          <div class="col-fixed hidden xxl:block" />
          <div class="col w-full">
            <article-footer :article="article" />
          </div>
        </div>
        <hr class="black">
        <p
          v-if="article?.section"
          role="heading"
          aria-level="2"
          class="type-label3 mt-2 mb-4"
        >
          MORE {{ article.section.slug }}
        </p>
        <article-recirculation
          :slug="sectionSlug"
          :article="article"
          tracking-component-location="Article Page Recirculation Module"
          nativo-id="ntv-article-1"
        />
        <div class="mt-6 mb-5">
          <hr class="black mb-4">
          <newsletter-home
            source="gothamist_footer"
            @submit="newsletterSubmitEvent('footer')"
          />
        </div>
      </div>
    </section>
  </div>
</template>

<style lang="scss">
.page.sectionSlug-articleSlug {
  .v-tag .p-button {
    background: transparent;
    &:hover {
      background: var(--tag-hover-bg);
    }
  }
  .v-tag.sponsored .p-button {
    background: var(--black);
    border: solid 1px var(--black);
    color: var(--white);
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

  .related-links {
    content-visibility: auto;
    contain-intrinsic-size: auto 244px;
    @include media('>=md') {
      contain-intrinsic-size: auto 326px;
    }
    @include media('>=lg') {
      contain-intrinsic-size: auto 255px;
    }
  }
  .recirculation {
    content-visibility: auto;
    contain-intrinsic-size: auto 1277px;
    @include media('>=md') {
      contain-intrinsic-size: auto 1300px;
    }
    @include media('>=lg') {
      contain-intrinsic-size: auto 940px;
    }
  }
  .comments {
    content-visibility: auto;
    contain-intrinsic-size: auto 2360px;
    @include media('>=md') {
      contain-intrinsic-size: auto 1939px;
    }
  }
  .newsletter-home {
    content-visibility: auto;
    contain-intrinsic-size: auto 278px;
    @include media('>=md') {
      contain-intrinsic-size: auto 209px;
    }
    @include media('>=lg') {
      contain-intrinsic-size: auto 218px;
    }
  }
}
</style>
