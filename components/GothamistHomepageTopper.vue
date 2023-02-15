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

const featuredArticle = computed(() => props.articles[0])
const latestArticles = computed(() => {
  return (
    props.articles
      .slice(1)
      // remove the manually curated featured article
      // from the list of latest articles so it
      // doesn't show up twice in this module
      .filter((article) => article.uuid !== featuredArticle.value.uuid)
      .slice(0, 4)
  )
})
</script>

<template v-if="featuredArticle && latestArticles">
  <div class="homepage-topper grid mb-6 gutter-x-30">
    <h2 class="sr-only">Featured Article</h2>
    <div class="col-12 xl:col-8">
      <gothamist-card
        :article="featuredArticle"
        class="featured-article mod-vertical mod-featured mod-large"
        :width="897"
        :height="598"
        loading="eager"
        :trackClicks="true"
        trackingComponentLocation="Homepage Topper"
        trackingComponent="Homepage Topper"
        :trackingComponentPosition="1"
      >
        <v-card-metadata altDesign :article="featuredArticle" />
      </gothamist-card>
    </div>
    <div class="col-12 xl:col-4 flex flex-column justify-content-end">
      <hr class="black mb-1" />
      <v-flexible-link
        class="mb-3 -ml-3"
        to="#latest"
        raw
        role="heading"
        aria-level="2"
      >
        <Button
          class="p-button-text p-button-rounded button-pill-icon"
          icon="pi pi-arrow-right ml-2"
          iconPos="right"
          label="LATEST"
        />
      </v-flexible-link>
      <div v-for="(article, index) in latestArticles" :key="article.uuid">
        <gothamist-card
          :article="article"
          :id="index === 3 ? 'ntv-latest-1' : ''"
          class="mod-horizontal mod-left mod-small mb-3 tag-small"
          :width="158"
          :height="105"
          :sizes="[2]"
          :hide-tags="true"
          :trackClicks="true"
          trackingComponentLocation="Homepage Topper"
          trackingComponent="Homepage Topper"
          :trackingComponentPosition="index + 2"
        >
          <div></div>
          <v-card-metadata :article="article" :showComments="false" />
        </gothamist-card>
        <hr class="my-3 block" />
      </div>
      <div class="mb-1">
        <HtlAd
          layout="rectangle"
          slot="htlad-gothamist_index_topper"
          fineprint="Gothamist is funded by sponsors and member donations"
          fineprintClass="text-center"
        />
      </div>
    </div>
  </div>
</template>

<style lang="scss"></style>
