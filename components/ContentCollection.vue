<script setup lang="ts">
import { ArticlePage } from '../composables/types/Page'
import VCard from '@nypublicradio/nypr-design-system-vue3/v2/src/components/VCard.vue'
import VByline from '@nypublicradio/nypr-design-system-vue3/v2/src/components/VByline.vue'
import useImageUrl from '~~/composables/useImageUrl'

const props = defineProps({
  articles: {
    type: Array,
    default: [],
  },
})

const articleData = []
//loop through articles and normalize data for each one
props.articles.forEach((article) => {
  articleData.push(normalizeArticlePage(article))
})
</script>
<template>
  <div>
    <div class="grid gutter-x-30 justify-content-center">
      <div
        v-for="article in articleData"
        :key="article.uuid"
        class="col-12 md:col-6 xl:col-4 flex"
      >
        <v-card
          class="mod-vertical mod-large mb-3 lg:mb-5 tag-small"
          :image="useImageUrl(article.listingImage)"
          :width="318"
          :height="212"
          :sizes="[1]"
          :title="article.listingTitle || article.title"
          :titleLink="article.link"
          :maxWidth="article.listingImage?.width"
          :maxHeight="article.listingImage?.height"
        >
          <p class="desc">
            {{ article.description }}
          </p>
          <v-card-metadata :article="article" />
        </v-card>
        <hr class="mb-5 block md:hidden" />
      </div>
    </div>
    <hr class="mb-5 hidden md:block" />
  </div>
</template>
