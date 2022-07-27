<script setup lang="ts">
import { onMounted } from 'vue'
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
  console.log('article', article)
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
      <Script
        v-if="article"
        type="application/ld+json"
        :children="JSON.stringify(useArticlePageStructuredData(article))"
      />
      <Link rel="canonical" v-if="article" :href="article.url" />
    </Head>
    <section>
      <div class="content">
        <div class="grid">
          <div class="col-fixed hidden xxl:block" style="width: 300px"></div>
          <div class="col">
            <v-tag :name="article.section.name" slug="/news" />
            <h2 class="mt-4 mb-3">{{ article.title }}</h2>
          </div>
          <div class="col-fixed hidden lg:block" style="width: 300px"></div>
        </div>
        <div class="grid">
          <div class="col-fixed hidden xxl:block" style="width: 300px">
            <byline :article="article" />
          </div>
          <div class="col overflow-hidden" v-if="article">
            <div class="mb-4 xxl:mb-6">
              <v-image-with-caption
                :image="useImageUrl(article.image)"
                :imageUrl="article.leadAsset.value.imageLink"
                :width="760"
                :height="506"
                :alt-text="article.image.alt"
                :maxWidth="article.image.width"
                :maxHeight="article.image.height"
                :credit="`Photo by ${article.image.credit}`"
                :credit-url="article.image.creditLink"
                :sizes="[1, 2]"
                :ratio="[3, 2]"
                :caption="
                  article.leadAsset.value.caption || article.image.caption
                "
              />
            </div>
            <div class="block xxl:hidden">
              <byline :article="article" />
            </div>
            <v-streamfield
              :streamfield-blocks="article.body"
              @all-blocks-mounted="handleArticleMounted"
            />
          </div>
          <div class="col-fixed hidden lg:block" style="width: 300px">
            <img src="https://fakeimg.pl/300x250/?text=AD Here" />
            <p class="type-fineprint">Powered by members and sponsors</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style lang="scss">
.sectionSlug-articleSlug {
  &:before {
    content: '';
    position: absolute;
    display: block;
    top: 0;
    left: 0;
    width: 100%;
    height: 720px;
    z-index: -1;
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
  }
  .v-tag .p-button {
    background: transparent;
  }
}
</style>
