<script setup lang="ts">
  import { GalleryPage } from '~/composables/types/Page'
  import VImageWithCaptionVue from '@nypublicradio/nypr-design-system-vue3/v2/src/components/VImageWithCaption.vue';

  const route = useRoute()
//   const { $analytics, $htlbid } = useNuxtApp()
  const gallery = await findPage(`${route.params.sectionSlug}/photos/${route.params.gallerySlug}`)
    .then(({data}) => normalizeFindPageResponse(data)) as GalleryPage

//   const trackingData = useArticlePageTrackingData(article)
//   const adTargetingData = useArticlePageAdTargetingData(article)
//   const sensitiveContent = useSensitiveContent()
//   const headMetadata = useArticlePageHeadMetadata(article)

//   useHead(headMetadata)

  onMounted(() => {
    // $analytics.sendPageView(trackingData)
    // $htlbid.setTargeting(adTargetingData)
    // sensitiveContent.value = article.sensitiveContent
  })

  onUnmounted(() => {
    // $htlbid.clearTargeting(adTargetingData)
    // sensitiveContent.value = false
  })
</script>

<template>
  <div v-if="gallery">
    <NuxtLink :to="gallery.articleLink">Back</NuxtLink>
    <h2 v-if="gallery.title">{{ gallery.title }}</h2>
    <div v-for="slide in gallery.slides">
      <div>
        <h3 v-if="slide.title">{{ slide.title }}</h3>
        <VImageWithCaptionVue
          :image="useImageUrl(slide.image)"
          :alt-text="slide.image.alt"
          :caption="slide.image.caption"
          :credit="slide.image.credit"
          :credit-url="slide.image.creditLink"
          :width="slide.image.width"
          :height="slide.image.height"
          :max-width="1200"
        />
      </div>
    </div>
  </div>
</template>
