<script setup lang="ts">
import VCard from '@nypublicradio/nypr-design-system-vue3/v2/src/components/VCard.vue'
import VSimpleResponsiveImage from '@nypublicradio/nypr-design-system-vue3/v2/src/components/VSimpleResponsiveImage.vue'
import VImageWithCaption from '@nypublicradio/nypr-design-system-vue3/v2/src/components/VImageWithCaption.vue'
import { ref } from 'vue'

const props = defineProps({
  collection: {
    type: Object,
    default: {},
    required: true,
  },
})

// Note: the single story feature should only display the first story in the content collection
const article = normalizeArticlePage(props.collection.data[0])
</script>

<template>
  <v-card
    v-if="article"
    class="mod-large mb-5 lg:mb-8 tag-small single-story-feature"
    data-style-mode="dark"
    :image="useImageUrl(article.listingImage)"
    :ratio="[3, 2]"
    :sizes="[1, 2]"
    :quality="70"
    :title="article.listingTitle"
    :titleLink="article.link"
    :maxWidth="article.listingImage?.width"
    :maxHeight="article.listingImage?.height"
    :tags="[
      {
        name: article.section.name,
        slug: article.section.slug,
      },
    ]"
  >
    <p class="desc">{{ article.description }} kim</p>
    <v-card-metadata :article="article" alt-design :show-description="false" />
  </v-card>
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
