<script setup lang="ts">
import VImageWithCaption from '@nypublicradio/nypr-design-system-vue3/v2/src/components/VImageWithCaption.vue'
import VTag from '@nypublicradio/nypr-design-system-vue3/v2/src/components/VTag.vue'
import { ArticlePage } from '../../composables/types/Page'

const route = useRoute()
const { $analytics, $htlbid } = useNuxtApp()
const article = (await findPage(
  `${route.params.sectionSlug}/${route.params.articleSlug}`
).then(({ data }) => normalizeFindPageResponse(data))) as ArticlePage

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
</script>

<template>
  <div>
    <Head>
      <Script v-if="article" type="application/ld+json" :children="JSON.stringify(useArticlePageStructuredData(article))" />
      <Link rel="canonical" v-if="article" :href="article.url" />
    </Head>
    <section>
      <div class="content">
        <div v-if="article">
          <div class="text-left md:text-center mb-3">
            <v-tag :name="article.section.name" :slug="article.section.slug" />
            <h1 class="mt-4 mb-6">{{ article.title }}</h1>
            <v-image-with-caption
              :image="useImageUrl(article.listingImage)"
              :alt-text="article.image.alt"
              :maxWidth="article.image.width"
              :maxHeight="article.image.height"
              :description="article.image.caption"
              :credit="`Photo by ${article.image.credit}`"
              :credit-url="article.image.creditLink"
              :ratio="[3, 2]"
            />
          </div>
          <hr class="mb-7" />
          <v-streamfield
            :streamfield-blocks="article.body"
            @all-blocks-mounted="handleArticleMounted"
          />
        </div>
      </div>
    </section>
  </div>
</template>
