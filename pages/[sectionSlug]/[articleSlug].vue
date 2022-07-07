<script setup lang="ts">
  import { ArticlePage } from '../../composables/types/Page'
  import { fuzzyDateTime } from '../../utilities/date'

  const route = useRoute()
  const { $analytics, $htlbid } = useNuxtApp()
  const article = await findPage(`${route.params.sectionSlug}/${route.params.articleSlug}`)
    .then(({data}) => normalizeFindPageResponse(data)) as ArticlePage

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

  function handleArticleMounted(el) {
    const landmarks = useStreamfieldLandmarks(el.value)
    const adTarget = landmarks[Math.min(landmarks.length - 1, 5)].node
    useInsertAd(adTarget)
  }

  function useInsertAd(targetElement) {
    const sensitiveContent = useSensitiveContent()
       if (article && !sensitiveContent.value) {
        const adDiv = document.createElement('DIV')
        adDiv.classList.add('htlad-interior_midpage_1',
          'ad-div',
          'mod-break-margins',
          'mod-ad-disclosure')
        useInsertAfterElement(adDiv, targetElement)
      }
  }
</script>

<template>
  <div v-if="article">
    <h2>{{ article.title }}</h2>
    <NuxtLink :to="`/${article.section.slug}`">{{article.section.name}}</NuxtLink><br>
    <span>{{ article.description }}</span><br>
    <span>{{ fuzzyDateTime(article.publicationDate) }}</span><br>
    <span v-if="article.updatedDate">Updated: {{ fuzzyDateTime(article.updatedDate) }}</span><br>
    <VStreamfield
      :streamfieldBlocks="article.body"
      @allBlocksMounted="handleArticleMounted"
    />
  </div>
</template>
