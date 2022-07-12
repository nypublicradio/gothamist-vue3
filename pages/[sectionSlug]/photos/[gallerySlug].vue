<script setup lang="ts">
  import { GalleryPage } from '~/composables/types/Page'
  import VImageWithCaptionVue from '@nypublicradio/nypr-design-system-vue3/v2/src/components/VImageWithCaption.vue';

  const route = useRoute()
  const { $analytics, $htlbid } = useNuxtApp()
  const gallery = await findPage(`${route.params.sectionSlug}/photos/${route.params.gallerySlug}`)
    .then(({data}) => normalizeFindPageResponse(data)) as GalleryPage

  const headMetadata = useGalleryPageHeadMetadata(gallery)
  const adTargetingData = { Template: 'Article Gallery' }

  useHead(headMetadata)

  onMounted(() => {
    $analytics.sendPageView({page_type: 'gallery'})
    $htlbid.setTargeting(adTargetingData)
  })

  onUnmounted(() => {
    $htlbid.clearTargeting(adTargetingData)
  })
</script>

<template>
  <div v-if="gallery">
    <NuxtLink :to="gallery.articleLink">Back</NuxtLink>
    <h2 v-if="gallery.title">{{ gallery.articleTitle }} - Photos</h2>
    <div v-for="slide in gallery.slides" key="slide.image.id">
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
