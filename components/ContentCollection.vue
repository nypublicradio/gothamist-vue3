<script setup lang="ts">
import { ArticlePage } from '../composables/types/Page'
import VCard from '@nypublicradio/nypr-design-system-vue3/v2/src/components/VCard.vue'
import VByline from '@nypublicradio/nypr-design-system-vue3/v2/src/components/VByline.vue'
import useImageUrl from '~~/composables/useImageUrl'

defineProps<{
  articles: ArticlePage[]
}>()
</script>
<template>
  <div class="grid">
    <div
      v-for="article in articles"
      :key="article.uuid"
      class="col-12 xl:col-4"
    >
      <v-card
        class="mod-vertical mod-large mb-3 lg:mb-5 tag-small"
        :image="useImageUrl(article.leadAsset[0].value.image.file)"
        :width="665"
        :height="448"
        :sizes="[1]"
        :title="article.title"
        :titleLink="article.link"
        :maxWidth="article.leadAsset[0].value.image.width"
        :maxHeight="article.leadAsset[0].value.image.height"
        :quality="80"
      >
        <p class="desc">
          {{ article.description }}
        </p>
        <div class="article-metadata">
          <span>
            <v-byline :authors="article.relatedAuthors" />
          </span>
          <span>comments</span>
        </div>
      </v-card>
      <hr class="mb-5" />
    </div>
  </div>
</template>
