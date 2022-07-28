<script setup lang="ts">
import VCard from '@nypublicradio/nypr-design-system-vue3/v2/src/components/VCard.vue'
import VByline from '@nypublicradio/nypr-design-system-vue3/v2/src/components/VByline.vue'
import useImageUrl from '~~/composables/useImageUrl'

const featuredArticle = await findPage('/').then(({ data }) =>
  normalizeHomePageFeaturedArticle(data)
)

const latestArticles = await findLatestArticlePages('').then(({ data }) =>
  normalizeFindArticlePagesResponse(data)
)

const articles = await findArticlePages('').then(({ data }) =>
  normalizeFindArticlePagesResponse(data)
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
          <div class="grid mb-6">
            <div class="col-12 xl:col-8">
              <v-card
                class="mod-vertical mod-featured mod-large"
                :image="useImageUrl(featuredArticle.listingImage)"
                :sizes="[1]"
                :width="871"
                :height="581"
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
              <hr class="black mb-3" />
              <div class="mb-3">LATEST</div>
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
                <hr class="mb-3" />
              </div>
              <p>ad goes here</p>
            </div>
          </div>
        </template>
        <div class="mt-4 mb-5">
          <hr class="black mb-4" />
          <newsletter-home @submit="newsletterSubmitEvent" />
          <hr class="black my-4" />
        </div>
        <template v-if="articles">
          <div v-for="article in articles" :key="article.uuid">
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
        </template>
      </div>
    </section>
    <!-- <section>
      <div class="content">
        <hr class="black mb-4" />
        <newsletter-home @submit="newsletterSubmitEvent" />
      </div>
    </section> -->
  </div>
</template>
