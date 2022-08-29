<script setup lang="ts">
import VCard from '@nypublicradio/nypr-design-system-vue3/v2/src/components/VCard.vue'
import useImageUrl from '~~/composables/useImageUrl'

const latestArticles = await findArticlePages({
  limit: 4,
}).then(({ data }) => normalizeFindArticlePagesResponse(data))

const articles = await findArticlePages('').then(({ data }) =>
  normalizeFindArticlePagesResponse(data)
)
const articlesToShow = ref(6)

let featuredArticle
const homePageCollections = []
const homePageCollectionItems = await findPage('/').then(({ data }) => {
  // the home page featured article should display only the first story in the home page content collection
  featuredArticle = normalizeArticlePage(
    data.value.pageCollectionRelationship?.[0].pages?.[0]
  )
  data.value.pageCollectionRelationship.forEach((collection) => {
    homePageCollections.push({
      id: collection.id,
      layout: collection.layout,
      data: collection.pages,
    })
  })
})

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
        <!-- home page collections -->
        <template v-if="homePageCollections && homePageCollections.length > 0">
          <div
            v-for="(collection, index) in homePageCollections"
            :key="collection.id"
          >
            <single-story-feature
              v-if="collection.layout === 'single-story-feature'"
              :collection="collection"
            />
            <div v-if="index === 1" id="ntv-stream-2"></div>
            <center-feature
              v-if="collection.layout === 'center-feature'"
              :collection="collection"
            />
          </div>
        </template>
        <boroughs class="mb-5 lg:mb-8" />
        <!-- river -->
        <template v-if="articles">
          <hr class="mb-4 black" />
          <div id="latest" class="grid gutter-x-xl">
            <div class="col-12 xxl:col-1 type-label3">LATEST</div>
            <div class="col">
              <div
                v-for="(article, index) in articles.slice(0, articlesToShow)"
                :key="index"
              >
                <v-card
                  id="index === 1 ? 'ntv-stream-3' : ''"
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
              </div>
              <Button
                v-if="articlesToShow < articles.length"
                class="p-button-rounded"
                label="Load More"
                @click="articlesToShow += 6"
              >
              </Button>
            </div>
            <div class="col-fixed hidden xl:block mx-auto">
              <img
                class="mb-4 xl:mb-7"
                src="https://fakeimg.pl/300x600/?text=AD Here"
                style="max-width: 100%"
                width="300"
                height="600"
                alt="advertisement"
              />
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
    #f3f3e4 0,
    rgba(255, 255, 255, 0) 615px,
    rgba(255, 255, 255, 0) 100%
  );
}
</style>
