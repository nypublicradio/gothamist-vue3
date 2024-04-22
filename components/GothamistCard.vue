<script setup lang="ts">
import VCard from '@nypublicradio/nypr-design-system-vue3/v2/src/components/VCard.vue'
import type { ArticlePage, GalleryPage } from '~~/composables/types/Page'
import type Image from '~~/composables/types/Image'

interface CardData {
  listingTitle: string
  listingImage?: Image
  link: string
}

defineOptions({
  inheritAttrs: false,
})
const props = withDefaults(defineProps<{
  article?: ArticlePage | GalleryPage | CardData
  width?: number
  height?: number
  ratio?: number[]
  sizes?: number[]
  quality?: number
  hideImage?: boolean
  hideTags?: boolean
  loading?: 'eager' | 'lazy'
  trackClicks?: boolean
  trackingComponent?: string
  trackingComponentLocation?: string
  trackingComponentPosition?: number
}>(), {
  article: null,
  width: null,
  height: null,
  ratio: () => [3, 2],
  sizes: () => [1],
  hideImage: false,
  hideTags: false,
  quality: 80,
  loading: 'lazy',
  trackClicks: false,
  trackingComponent: null,
  trackingComponentLocation: null,
  trackingComponentPosition: null,
})
const { $analytics } = useNuxtApp()
const sponsored = computed(() => 'sponsoredContent' in props.article && props.article.sponsoredContent)
const link = computed(() => ('link' in props.article && props.article.link)
  || ('url' in props.article && props.article.url))

const tags = computed(() => {
  if (props.hideTags
    || sponsored.value
    || !('section' in props.article))
    return []

  return [
    {
      name: props.article.section.name,
      slug: `/${props.article.section.slug}`,
    },
  ]
})

const trackClick = function (targetUrl: string) {
  if (props.trackClicks) {
    $analytics.scheduleEvent('click_tracking', {
      event_category: `Click Tracking - ${props.trackingComponentLocation}`,
      component: props.trackingComponent,
      component_position: props.trackingComponentPosition && String(props.trackingComponentPosition),
      event_label: targetUrl,
    })
  }
}
</script>

<template>
  <VCard
    v-if="article"
    class="gothamist-card"
    :image="hideImage ? null : useImageUrl(article.listingImage)"
    :title="article.listingTitle"
    :title-link="link"
    :max-width="article.listingImage?.width"
    :max-height="article.listingImage?.height"
    :sponsored="sponsored"
    :ratio="ratio"
    :width="width"
    :height="height"
    :sizes="sizes"
    :quality="quality"
    :tags="tags"
    :loading="loading"
    v-bind="{ ...$props, ...$attrs }"
    @title-click="trackClick(link)"
    @image-click="trackClick(link)"
    @credit-click="trackClick(article.listingImage?.creditLink)"
    @tag-click="(tag) => trackClick(`tags/${tag?.slug}`)"
  >
    <slot :track-click="trackClick" />
  </VCard>
</template>

<style lang="scss">
div.gothamist-card.sponsored {
    background: var(--soybean200)
}
@include media('<lg') {
    div.gothamist-card.sponsored.mod-horizontal {
        min-width: 100vw;
        padding: 0 1.5rem;
        margin-left: -1.5rem;
        & .image-with-caption {
            margin: 2rem 0;
        }
    }
}

.gothamist-card {
  --tag-bg: transparent;
}

@media(pointer:coarse) {
  .image-with-caption-image-link img {
    transition: transform 0.1s ease-in;
  }
  .image-with-caption-image-link:active img {
    transition: transform 0.1s ease-out;
    transform: scale(0.97);
  }
}
</style>
