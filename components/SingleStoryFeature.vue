<script setup lang="ts">
import { ArticlePage } from '~~/composables/types/Page';

const props = defineProps<{
  collection: {label: string, data: ArticlePage[]},
  trackingComponentLocation: string
}>()
const trackingComponent = "Single Story Feature"

// Note: the single story feature should only display the first story in the content collection
const article = normalizeArticlePage(props.collection.data[0])
</script>

<template>
  <h2 class="sr-only">Feature</h2>
  <gothamist-card
    :article="article"
    v-if="article"
    class="mod-large mb-5 lg:mb-8 tag-small single-story-feature"
    data-style-mode="dark"
    :sizes="[2]"
    :trackClicks="true"
    :trackingComponentLocation="trackingComponentLocation"
    :trackingComponent="trackingComponent"
    :trackingComponentPosition="1"
  >
    <p class="desc">{{ article.description }}</p>
    <v-card-metadata :article="article" alt-design :show-description="false" />
  </gothamist-card>
</template>

<style lang="scss">
.v-card.single-story-feature {
  .card-image-wrapper {
    @include media('<xxl') {
      flex-basis: 65%;
    }
    @include media('<lg') {
      margin-bottom: 0;
    }
  }
  .card-details {
    align-self: flex-end !important;
    padding: 0 1rem 1rem 0rem !important;
    @include media('<lg') {
      padding: 0 1rem 1rem 1rem !important;
    }
  }
}
</style>
