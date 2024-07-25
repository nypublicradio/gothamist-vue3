<script setup lang="ts">
import VImageWithCaption from '@nypublicradio/nypr-design-system-vue3/v2/src/components/VImageWithCaption.vue'
import VShareTools from '@nypublicradio/nypr-design-system-vue3/v2/src/components/VShareTools.vue'
import VShareToolsItem from '@nypublicradio/nypr-design-system-vue3/v2/src/components/VShareToolsItem.vue'
import { usePreviewData } from '~/composables/states'
import type { GalleryPage } from '~/composables/types/Page'

const previewData = usePreviewData()
const route = useRoute()
const { $analytics, $htlbid } = useNuxtApp()
const isPreview = Boolean(route.query.preview)

const gallery = isPreview
  ? previewData.value.data
  : ((await findPage(
      `${route.params.sectionSlug}/photos/${route.params.gallerySlug}`,
    ).then(({ data }) => normalizeFindPageResponse(data),
    ).catch(() => {
      throw createError({
        statusCode: 404,
        statusMessage: 'Page Not Found',
        fatal: true,
      })
    })) as GalleryPage)

if (gallery.slides.length <= 0 && gallery.articleLink)
  navigateTo(gallery.articleLink, { replace: true, redirectCode: 301 })

const shareUrl = ref(gallery.url)
const shareTitle = ref(gallery.title)

const headMetadata = useGalleryPageHeadMetadata(gallery)
const adTargetingData = { Template: 'Article Gallery' }
const article = gallery.relatedArticles?.[0]

useHead({
  title: `${article.seoTitle} - Gothamist`,
  link: [
    { rel: 'canonical', href: gallery?.url },
  ],
})
useServerHead(headMetadata)
useChartbeat({
  section: article.section.name,
  authors: article.authors.map(author => author.name).join(','),
})
useOptinMonster()

onMounted(() => {
  $analytics.schedulePageView({
    page_type: 'gallery',
    content_group: article?.sponsoredContent ? 'sponsored-content' : `${route.params.sectionSlug}-gallery`,
  })
  $htlbid.setTargeting(adTargetingData)
})
onUnmounted(() => {
  $htlbid.clearTargeting(adTargetingData)
})

function goBack() {
  // When in preview mode, and an article is not published, the gallery will not have access to its parent article slug and is just passed "null" (please see galleryPages.ts ~line: 56), so we just use the window history in this case.
  if (!gallery.articleLink) {
    window.history.go(-1)
    return false
  }
  return null
}
</script>

<template>
  <section v-if="gallery" data-style-mode="dark">
    <div class="content">
      <div class="grid gutter-30 mb-4">
        <div class="col-6">
          <VShareTools label="Share" class="mt-3">
            <VShareToolsItem
              action="share"
              service="facebook"
              :url="shareUrl"
              :utm-parameters="{
                medium: 'social',
                source: 'facebook',
                campaign: 'shared_facebook',
              }"
              @share="
                $analytics.scheduleEvent('click_tracking', {
                  event_category: 'Click Tracking',
                  component: 'Article Byline',
                  event_label: 'Social Share Facebook',
                })
              "
            />
            <VShareToolsItem
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
                $analytics.scheduleEvent('click_tracking', {
                  event_category: 'Click Tracking',
                  component: 'Article Byline',
                  event_label: 'Social Share Twitter',
                })
              "
            />
            <VShareToolsItem
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
                $analytics.scheduleEvent('click_tracking', {
                  event_category: 'Click Tracking',
                  component: 'Article Byline',
                  event_label: 'Social Share Reddit',
                })
              "
            />
            <VShareToolsItem
              action="share"
              service="email"
              :url="shareUrl"
              :share-parameters="{ body: `${shareTitle} - %URL%` }"
              :utm-parameters="{
                medium: 'social',
                source: 'email',
                campaign: 'shared_email',
              }"
              @share="
                $analytics.scheduleEvent('click_tracking', {
                  event_category: 'Click Tracking',
                  component: 'Article Byline',
                  event_label: 'Social Share Email',
                })
              "
            />
          </VShareTools>
        </div>
        <div class="col-6 text-right">
          <NuxtLink :to="gallery.articleLink" @click="goBack()">
            <i class="pi pi-times" />
            <span class="sr-only">Return to Article</span>
          </NuxtLink>
        </div>
      </div>
      <div class="grid gutter-x-30">
        <div class="col-12">
          <h1 v-if="gallery.title">
            {{ gallery.articleTitle }}
          </h1>
          <p class="gallery-photo-count mb-3">
            {{ gallery.slides.length }} photos
          </p>
        </div>
        <div
          v-for="(slide, index) in gallery.slides"
          :key="`${slide.image.id}-${index}`"
          class="col-12"
          :class="{ 'xl:col-6': index % 3 !== 0 }"
        >
          <template v-if="index === 3 || (index > 0 && index % 6 === 0)">
            <HtlAd
              slot-name="htlad-gothamist_interior_midpage_repeating"
              layout="rectangle"
            />
            <hr class="my-3">
          </template>
          <VImageWithCaption
            v-if="slide.image"
            :image="useImageUrl(slide.image)"
            :alt-text="slide.image.alt"
            :max-width="slide.image.width"
            :max-height="slide.image.height"
            :credit="slide.image.credit"
            :credit-url="slide.image.creditLink"
            :description="slide.title || slide.image.caption"
            :sizes="[2]"
            :ratio="[slide.image.width, slide.image.height]"
            :allow-preview="true"
            :loading="index === 0 ? 'eager' : 'lazy'"
          />
          <hr class="my-3">
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

.sectionSlug-photos-gallerySlug .content {
  padding-bottom: 140px;
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
  color: var(--black400) !important;
  margin-top: 0.5rem;
  @include font-config($type-fineprint);
}
</style>
