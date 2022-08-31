<script setup lang="ts">
import VCard from '@nypublicradio/nypr-design-system-vue3/v2/src/components/VCard.vue'
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
    :width="1440"
    :height="968"
    :sizes="[1]"
    :quality="90"
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
    <p class="desc">
      {{ article.description }}
    </p>
    <v-card-metadata :article="article" />
  </v-card>
</template>

<style lang="scss">
.v-card.single-story-feature .card-details {
  justify-content: flex-end;
  @include media('<xl') {
    padding: 0 1rem 1.5rem 1rem;
  }
}
</style>
