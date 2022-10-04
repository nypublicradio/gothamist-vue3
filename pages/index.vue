<script setup lang="ts">
import VCard from '@nypublicradio/nypr-design-system-vue3/v2/src/components/VCard.vue'
import useImageUrl from '~~/composables/useImageUrl'

const articlesPromise = findArticlePages('').then(({ data }) =>
  normalizeFindArticlePagesResponse(data)
)

const homePageCollectionsPromise = findPage('/').then(({ data }) => {
  return data.value.pageCollectionRelationship.map((collection) => {
    return {
      id: collection.id,
      layout: collection.layout,
      label: collection.label,
      data: collection.pages,
    }
  })
})

const [articles, homePageCollections] = await Promise.all(
  [articlesPromise, homePageCollectionsPromise]
)

// the latest 4 articles
const latestArticles = articles.slice(0,4)

// the home page featured article should display only the first story in the home page content collection
const featuredArticle = normalizeArticlePage(
  homePageCollections?.[0].data?.[0]
)

const riverStoryCount = ref(6)
const riverAdOffset = ref(2)
const riverAdRepeatRate = ref(6)

const { $analytics } = useNuxtApp()
const newsletterSubmitEvent = () => {
  $analytics.sendEvent('click_tracking', {
    event_category: 'Click Tracking - Footer - Newsletter',
    component: 'footer',
    event_label: 'Newsletter',
  })
}
const navigation = useNavigation()

onMounted(() => {
  $analytics.sendPageView({ page_type: 'home_page' })
})
</script>

<template>
  <div>
    <section>
      <div class="content">
        <gothamist-homepage-topper
          :articles="[featuredArticle, ...latestArticles]"
          :navigation="navigation"
        />
        <!-- newsletter -->
        <div class="my-8">
          <hr class="black mb-4" />
          <newsletter-home @submit="newsletterSubmitEvent" />
        </div>
      </div>
      <!-- home page collections -->
      <template v-if="homePageCollections && homePageCollections.length > 0">
        <template
          v-for="(collection, index) in homePageCollections"
          :key="collection.id"
        >
          <single-story-feature
            v-if="collection.layout === 'single-story-feature'"
            :collection="collection"
          />
          <div v-if="index === 1" id="ntv-stream-2"></div>
          <center-feature
            class="content"
            v-if="collection.layout === 'center-feature'"
            :collection="collection"
          />
        </template>
      </template>
      <boroughs class="mb-5 lg:mb-8" />
      <!-- river -->

      <div class="content">
        <template v-if="articles">
          <hr class="mb-4 black" />
          <div id="latest" class="grid gutter-x-xl">
            <div class="col-12 xxl:col-1 type-label3">LATEST</div>
            <div class="col">
              <div
                v-for="(article, index) in articles.slice(0, riverStoryCount)"
                :key="article.uuid"
              >
                <v-card
                  :id="index === 1 ? 'ntv-stream-3' : ''"
                  class="mod-horizontal mb-3 lg:mb-5 tag-small"
                  :image="useImageUrl(article.listingImage)"
                  :width="318"
                  :height="212"
                  :sizes="[1]"
                  :quality="80"
                  :title="article.listingTitle"
                  :titleLink="article.link"
                  :maxWidth="article.image?.width"
                  :maxHeight="article.image?.height"
                  :tags="[
                    {
                      name: article.section.name,
                      slug: `/${article.section.slug}`,
                    },
                  ]"
                >
                  <p class="desc">
                    {{ article.description }}
                  </p>
                  <v-card-metadata :article="article" />
                </v-card>
                <hr class="mb-5" />
                <div
                  v-if="(index + riverAdOffset) % riverAdRepeatRate === 0"
                  class="xl:hidden"
                >
                  <HtlAd
                    slot="htlad-gothamist_index_river"
                    layout="rectangle"
                  />
                  <hr class="mb-5" />
                </div>
              </div>
              <Button
                v-if="riverStoryCount < articles.length"
                class="p-button-rounded"
                label="Load More"
                @click="riverStoryCount += 6"
              >
              </Button>
            </div>
            <div class="col-fixed hidden xl:block mx-auto">
              <HtlAd slot="htlad-gothamist_index_river" layout="rectangle" />
            </div>
          </div>
        </template>
      </div>
    </section>
  </div>
</template>

<style lang="scss">
.page.index {
  background: linear-gradient(
    180deg,
    #f3f3e4 120px,
    rgba(255, 255, 255, 0) 615px,
    rgba(255, 255, 255, 0) 100%
  );
}
</style>
