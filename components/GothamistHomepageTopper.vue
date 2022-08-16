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
const latestArticles = computed(() => props.articles.slice(1))
</script>

<template v-if="featuredArticle && latestArticles">
  <div class="homepage-topper grid mb-6 gutter-x-30">
    <div class="col-12 flex align-items-end mb-2">
      <menu-list
        class="homepage-topper-navigation hidden md:flex col-fixed p-0"
        :navLinks="navigation.primaryNavigation"
      />
      <LogoGothamist class="homepage-topper-logo col p-0"></LogoGothamist>
    </div>
    <div class="col-12 xl:col-8">
      <v-card
        class="featured-article mod-vertical mod-featured mod-large"
        :image="useImageUrl(featuredArticle.listingImage)"
        :sizes="[1]"
        :width="897"
        :height="598"
        :title="featuredArticle.listingTitle || featuredArticle.title"
        :titleLink="featuredArticle.link"
        :maxWidth="featuredArticle.listingImage?.width"
        :maxHeight="featuredArticle.listingImage?.height"
        :tags="[
          {
            name: featuredArticle.section.name,
            slug: `/${featuredArticle.section.slug}`,
          },
        ]"
      >
        <v-card-metadata altDesign :article="featuredArticle" />
      </v-card>
    </div>
    <div class="col-12 xl:col-4 flex flex-column justify-content-end">
      <hr class="black mb-1" />
      <v-flexible-link class="mb-3 -ml-3" to="#latest" raw>
        <Button
          class="p-button-text p-button-rounded button-pill-icon"
          icon="pi pi-arrow-right ml-2"
          iconPos="right"
          label="LATEST"
        />
      </v-flexible-link>
      <div v-for="article in latestArticles" :key="article.uuid">
        <v-card
          class="mod-horizontal mod-left mod-small mb-3 tag-small"
          :image="useImageUrl(article.listingImage)"
          :width="158"
          :height="106"
          :sizes="[1]"
          :title="article.listingTitle || article.title"
          :titleLink="article.link"
          :maxWidth="article.listingImage?.width"
          :maxHeight="article.listingImage?.height"
          :quality="80"
        >
          <v-card-metadata :article="article" :showComments="false" />
        </v-card>
      </div>
      <img
        class="mb-1"
        src="https://fakeimg.pl/450x250/?text=AD Here"
        style="max-width: 100%"
        width="450"
        height="250"
        alt="advertisement"
      />
      <p class="type-fineprint">
        Gothamist is funded by sponsors and member donations
      </p>
    </div>
  </div>
</template>

<style lang="scss">
.homepage-topper-navigation {
  width: 225px;
  @include media('>lg') {
    width: 300px;
  }
}

.homepage-topper-logo {
  height: auto;
}
</style>
