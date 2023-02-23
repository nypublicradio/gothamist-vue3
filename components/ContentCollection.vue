<script setup lang="ts">
import { ArticlePage } from '../composables/types/Page'

const props = withDefaults(defineProps<{
  articles?: ArticlePage[]
  trackingComponentLocation: string
}>(), {
  articles: () => []
})
const trackingComponent = "Content Collection"

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
        v-for="(article, index) in articleData"
        :key="article.uuid"
        class="col-12 md:col-6 xl:col-4 flex"
      >
        <gothamist-card
          v-slot="card"
          :article="article"
          class="mod-vertical mod-large mb-3 lg:mb-5 tag-small"
          :width="318"
          :height="212"
          :sizes="[1]"
          :trackClicks="true"
          :trackingComponentLocation="trackingComponentLocation"
          :trackingComponent="trackingComponent"
          :trackingComponentPosition="index + 1"
        >
          <p class="desc">
            {{ article.description }}
          </p>
          <v-card-metadata
            :article="article"
            @link-click="$event => card.trackClick($event)"
          />
        </gothamist-card>
        <hr class="mb-5 block md:hidden" />
      </div>
    </div>
    <hr class="mb-5 hidden md:block" />
  </div>
</template>
