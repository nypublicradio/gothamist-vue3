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
        loading="eager"
      >
        <v-card-metadata altDesign :article="featuredArticle" />
      </v-card>
    </div>
    <div class="col-12 xl:col-4 flex flex-column justify-content-end">
      <hr class="black mb-3 xl:hidden" />
      <hr class="black mb-1" />
      <v-flexible-link class="mb-3 -ml-3" to="#latest" raw>
        <Button
          class="p-button-text p-button-rounded button-pill-icon"
          icon="pi pi-arrow-right ml-2"
          iconPos="right"
          label="LATEST"
        />
      </v-flexible-link>
      <div v-for="(article, index) in latestArticles" :key="article.uuid">
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
          <div></div>
          <v-card-metadata :article="article" :showComments="false" />
        </v-card>
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
