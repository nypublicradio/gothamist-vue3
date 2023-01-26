<script setup lang="ts">
import { ArticlePage } from '../composables/types/Page'

const props = withDefaults(defineProps<{
  articles?: ArticlePage[]
}>(), {
  articles: () => []
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
        <gothamist-card
          :article="article"
          class="mod-vertical mod-large mb-3 lg:mb-5 tag-small"
          :width="318"
          :height="212"
          :sizes="[1]"
        >
          <p class="desc">
            {{ article.description }}
          </p>
          <v-card-metadata :article="article" />
        </gothamist-card>
        <hr class="mb-5 block md:hidden" />
      </div>
    </div>
    <hr class="mb-5 hidden md:block" />
  </div>
</template>
