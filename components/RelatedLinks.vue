<script async setup lang="ts">
import type { ArticlePage } from '~~/composables/types/Page'
import type NavigationLink from '~~/composables/types/NavigationLink'

const props = withDefaults(defineProps<{
  article: ArticlePage
  limit?: number
  trackingComponentLocation?: string
}>(), {
  limit: 3,
  trackingComponentLocation: 'Related Links',
})
const trackingComponent = 'Related Links'

async function getRelatedPage(item) {
  const pageResponse = await usePageById(item.value.page)
  const page = normalizeFindPageResponse(pageResponse.data)
  const link = 'link' in page && page.link || 'url' in page && page.url
  return {
    listingTitle: item.value.title || page.listingTitle,
    listingImage: page.listingImage,
    link,
  }
}

async function getRelatedExternalLink(item) {
  return {
    listingTitle: item.value.title,
    listingImage: item.value.thumbnail,
    link: item.value.url,
  }
}

async function getRelatedItem(item: NavigationLink) {
  if (item.type === 'cms_page')
    return getRelatedPage(item)
  else if (item.type === 'external_link')
    return getRelatedExternalLink(item)
}

const limit = ref(Math.max(props.article.relatedLinks.length, props.limit))

const relatedLinks = await Promise.all(props.article.relatedLinks.slice(0, limit.value).map(getRelatedItem))
</script>

<template>
  <div v-bind="{ ...$attrs }">
    <div v-if="relatedLinks.length" class="related-links">
      <hr class="black mb-2">
      <div class="type-label3 mb-4">
        Related stories
      </div>
      <horizontal-drag v-slot="slotProps" :items="relatedLinks">
        <!-- article page -->
        <gothamist-card
          class="mod-horizontal mod-left mod-small mb-0"
          :article="slotProps.item"
          :track-clicks="true"
          :tracking-component-location="trackingComponentLocation"
          :tracking-component="trackingComponent"
          :tracking-component-position="slotProps.index + 1"
        >
          <div v-if="'author' in slotProps.item" />
          <v-card-metadata
            v-if="'author' in slotProps.item"
            :article="slotProps.item"
            :show-comments="false"
          />
        </gothamist-card>
      </horizontal-drag>
    </div>
  </div>
</template>

<style lang="scss">
.related-links {
}
</style>
