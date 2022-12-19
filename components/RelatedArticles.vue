<script setup lang="ts">
import { computed } from 'vue'
import VFlexibleLink from '@nypublicradio/nypr-design-system-vue3/v2/src/components/VFlexibleLink.vue'
import VCard from '@nypublicradio/nypr-design-system-vue3/v2/src/components/VCard.vue'
import { ArticlePage } from '~~/composables/types/Page.js'
import Navigation from '~~/composables/types/Navigation.js'

const props = defineProps<{
  articles: ArticlePage[]
  navigation: Navigation
}>()

const relatedArticles = computed(() => {
  return props.articles
})
</script>

<template>
  <div class="related-articles">
    <div class="col-12 xl:col-4 flex flex-row justify-content-end">
      <hr class="black mb-1" />
      <p>
        More from
        <v-flexible-link class="mb-3 -ml-3" to="#latest" raw>
          <Button
            class="p-button-text p-button-rounded button-pill-icon"
            label="BROOKLYN"
          />
        </v-flexible-link>
      </p>
      <div v-for="(article, index) in relatedArticles" :key="article.uuid">
        <v-card
          :id="index === 3 ? 'ntv-latest-1' : ''"
          class="mod-horizontal mod-left mod-small mb-3 tag-small"
          :image="useImageUrl(article.listingImage)"
          :width="158"
          :height="106"
          :sizes="[2]"
          :title="article.listingTitle || article.title"
          :titleLink="article.link"
          :maxWidth="article.listingImage?.width"
          :maxHeight="article.listingImage?.height"
          :quality="80"
        >
          <!--           <div></div>
          <v-card-metadata :article="article" :showComments="false" /> -->
        </v-card>
        <hr class="my-3 block" />
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.related-articles {
}
</style>
