<script setup lang="ts">
import VCard from '@nypublicradio/nypr-design-system-vue3/v2/src/components/VCard.vue'
import VByline from '@nypublicradio/nypr-design-system-vue3/v2/src/components/VByline.vue'
import VFlexibleLink from '@nypublicradio/nypr-design-system-vue3/v2/src/components/VFlexibleLink.vue'
import useImageUrl from '~~/composables/useImageUrl'

// the home page featured article should display only the first story in the home page content collection
const featuredArticle = await findPage('/').then(({ data }) =>
  normalizeArticlePage(data.value.pageCollectionRelationship?.[0].pages?.[0])
)

const latestArticles = await findArticlePages({
  show_as_feature: true,
  limit: 4,
}).then(({ data }) => normalizeFindArticlePagesResponse(data))

const articles = await findArticlePages('').then(({ data }) =>
  normalizeFindArticlePagesResponse(data)
)
const articlesToShow = ref(6)

const homePageCollections = []
const homePageCollectionItems = await findPage('/').then(({ data }) =>
  data.value.pageCollectionRelationship.forEach((collection) => {
    homePageCollections.push({
      id: collection.id,
      layout: collection.layout,
      data: normalizeArticlePage(collection.pages[0]),
    })
  })
)

const newsletterSubmitEvent = (e) => {
  //emitted newsletter submit event, @Matt, not exactly sure how to get this work like you mentioned.
  // sendEvent('click_tracking', {
  //   event_category: 'Click Tracking',
  //   component: 'Footer',
  //   event_label: 'Become a member',
  // })
}

onMounted(() => {
  const { $analytics } = useNuxtApp()
  $analytics.sendPageView({ page_type: 'home_page' })
})
</script>

<template>
  <div>
    <section>
      <div class="content">
        <template v-if="featuredArticle && latestArticles">
          <div class="grid mb-6 gutter-x-30">
            <div class="col-12 xl:col-8">
              <v-card
                class="featured-article mod-vertical mod-featured mod-large"
                :image="useImageUrl(featuredArticle.listingImage)"
                :sizes="[1]"
                :width="897"
                :height="598"
                :title="featuredArticle.title"
                :titleLink="featuredArticle.link"
                :maxWidth="featuredArticle.image.width"
                :maxHeight="featuredArticle.image.height"
                :tags="[
                  {
                    name: featuredArticle.section.name,
                    slug: featuredArticle.section.slug,
                  },
                ]"
              >
                <p class="desc">
                  {{ featuredArticle.description }}
                </p>
                <div class="article-metadata">
                  <span>
                    <v-byline :authors="featuredArticle.authors" />
                  </span>
                  <span>comments</span>
                </div>
              </v-card>
            </div>
            <div class="col-12 xl:col-4">
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
                  :title="article.title"
                  :titleLink="article.link"
                  :maxWidth="article.image.width"
                  :maxHeight="article.image.height"
                >
                  <div class="article-metadata">
                    <span>
                      <v-byline :authors="article.authors" />
                    </span>
                    <span>comments</span>
                  </div>
                </v-card>
              </div>
              <img
                class="mb-1"
                src="https://fakeimg.pl/450x250/?text=AD Here"
              />
              <p class="text-sm text-gray-400">
                Powered by members and sponsors
              </p>
            </div>
          </div>
        </template>
        <!-- home page collections - only implementing the single story feature layout for now -->
        <template v-if="homePageCollections && homePageCollections.length > 0">
          <div v-for="collection in homePageCollections" :key="collection.id">
            <v-card
              v-if="collection.layout === 'single-story-feature'"
              class="mod-large mb-3 lg:mb-6 tag-small"
              data-style-mode="dark"
              :image="useImageUrl(collection.data.listingImage)"
              :ratio="[3, 2]"
              :width="1053"
              :height="708"
              :sizes="[1]"
              :title="collection.data.title"
              :titleLink="collection.data.link"
              :maxWidth="collection.data.image.width"
              :maxHeight="collection.data.image.height"
              :tags="[
                {
                  name: collection.data.section.name,
                  slug: collection.data.section.slug,
                },
              ]"
            >
              <p class="desc">
                {{ collection.data.description }}
              </p>
              <div class="article-metadata">
                <span>
                  <v-byline :authors="collection.data.authors" />
                </span>
                <span>comments</span>
              </div>
            </v-card>
          </div>
        </template>
        <!-- river -->
        <template v-if="articles">
          <div id="latest" class="grid gutter-x-xl">
            <div class="col-1 type-label3">LATEST</div>
            <div class="col">
              <div
                v-for="article in articles.slice(0, articlesToShow)"
                :key="article.uuid"
              >
                <v-card
                  class="mod-horizontal mb-3 lg:mb-5 tag-small"
                  :image="useImageUrl(article.listingImage)"
                  :width="318"
                  :height="212"
                  :sizes="[1]"
                  :title="article.title"
                  :titleLink="article.link"
                  :maxWidth="article.image.width"
                  :maxHeight="article.image.height"
                  :tags="[
                    {
                      name: article.section.name,
                      slug: article.section.slug,
                    },
                  ]"
                >
                  <p class="desc">
                    {{ article.description }}
                  </p>
                  <div class="article-metadata">
                    <span>
                      <v-byline :authors="article.authors" />
                    </span>
                    <span>comments</span>
                  </div>
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
            <div class="col-fixed mx-auto">
              <img
                class="mb-4 xl:mb-7"
                src="https://fakeimg.pl/300x600/?text=AD Here"
              />
            </div>
          </div>
        </template>
        <!-- newsletter -->
        <div class="mt-8 mb-5">
          <hr class="black mb-4" />
          <newsletter-home @submit="newsletterSubmitEvent" />
        </div>
      </div>
    </section>
  </div>
</template>

<style lang="scss">
.v-card.featured-article {
  .card-details {
    padding: 0.75rem 0;
  }
  .card-image-wrapper {
    width: 100%;
    margin-right: 0;
    margin-bottom: 0;
  }
}
</style>
