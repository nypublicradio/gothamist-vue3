<script setup lang="ts">
import { GalleryPage } from '~/composables/types/Page'
import VImageWithCaption from '@nypublicradio/nypr-design-system-vue3/v2/src/components/VImageWithCaption.vue'
import VShareTools from '@nypublicradio/nypr-design-system-vue3/v2/src/components/VShareTools.vue'
import VShareToolsItem from '@nypublicradio/nypr-design-system-vue3/v2/src/components/VShareToolsItem.vue'

const route = useRoute()
const { $analytics, $htlbid } = useNuxtApp()

const gallery = (await findPage(
  `${route.params.sectionSlug}/photos/${route.params.gallerySlug}`
).then(({ data }) => normalizeFindPageResponse(data))) as GalleryPage

const shareUrl = ref(gallery.url)
const shareTitle = ref(gallery.title)

const headMetadata = useGalleryPageHeadMetadata(gallery)
const adTargetingData = { Template: 'Article Gallery' }

useHead(headMetadata)

onMounted(() => {
  $analytics.sendPageView({ page_type: 'gallery' })
  $htlbid.setTargeting(adTargetingData)
})
onUnmounted(() => {
  $htlbid.clearTargeting(adTargetingData)
})
</script>

<template>
  <section v-if="gallery" data-style-mode="dark">
    <div class="content">
      <div class="grid gutter-30 mb-4">
        <div class="col-6">
          <v-share-tools label="Share" class="mt-3">
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
                  component: 'Article Byline',
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
                  component: 'Article Byline',
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
                  component: 'Article Byline',
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
                  component: 'Article Byline',
                  event_label: 'Social Share Email',
                })
              "
            />
          </v-share-tools>
        </div>
        <div class="col-6 text-right">
          <NuxtLink :to="gallery.articleLink">
            <i class="pi pi-times" />
          </NuxtLink>
        </div>
      </div>
      <div class="grid gutter-x-30">
        <div class="col-12">
          <h1 v-if="gallery.title">{{ gallery.articleTitle }}</h1>
          <p class="gallery-photo-count mb-3">
            {{ gallery.slides.length }} photos
          </p>
        </div>
        <div
          v-for="(slide, index) in gallery.slides"
          class="col-12"
          :class="{ 'xl:col-6': index % 3 !== 0 }"
          :key="index"
        >
          <template v-if="index === 3 || (index > 0 && index % 6 === 0)">
              <HtlAd
                layout="rectangle"
                slot="htlad-gothamist_interior_midpage_repeating"
              />
              <hr class="my-3" />
          </template>
          <v-image-with-caption
            v-if="slide.image"
            :image="useImageUrl(slide.image)"
            :alt-text="slide.image.alt"
            :maxWidth="slide.image.width"
            :maxHeight="slide.image.height"
            :credit="
              slide.image.credit ? `Photo by ${slide.image.credit}` : null
            "
            :credit-url="slide.image.creditLink"
            :description="slide.title || slide.image.caption"
            :quality="80"
            :sizes="[1, 2]"
            :ratio="[slide.image.width, slide.image.height]"
            :allow-preview="true"
          />
          <hr class="my-3" />
        </div>
      </div>
      <div class="text-right mt-2">
        <NuxtLink :to="gallery.articleLink">
          <Button class="p-button-rounded" label="Back to article" />
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<style lang="scss">
.sectionSlug-photos-gallerySlug .gothamist-header,
.sectionSlug-photos-gallerySlug .gothamist-footer {
  display: none !important;
}

.sectionSlug-photos-gallerySlug {
  background: var(--black);
}

.sectionSlug-photos-gallerySlug .pi-times {
  font-size: var(--font-size-9);
}

.sectionSlug-photos-gallerySlug h1 {
  max-width: 665px;
  font-size: var(--font-size-14);
  line-height: var(--font-size-15);
}

.sectionSlug-photos-gallerySlug .gallery-photo-count {
  font-size: var(--font-size-4);
  font-family: var(--font-family-header);
  color: var(--black-100);
}

.sectionSlug-photos-gallerySlug [data-style-mode='dark'] hr {
  background: var(--black-400);
}

.sectionSlug-photos-gallerySlug
  .image-with-caption
  .image-with-caption-description {
  margin-top: 1rem;
}

.sectionSlug-photos-gallerySlug
  .image-with-caption
  .image-with-caption-credit-link {
  @include font-config($type-fineprint);
  color: var(--black400) !important;
  margin-top: 0.5rem;
}
</style>
