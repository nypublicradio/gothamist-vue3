<script setup lang="ts">
import VCard from '@nypublicradio/nypr-design-system-vue3/v2/src/components/VCard.vue'
import VByline from '@nypublicradio/nypr-design-system-vue3/v2/src/components/VByline.vue'
import useImageUrl from '~~/composables/useImageUrl'

const featuredArticles = await findFeaturedArticlePages('').then(({ data }) =>
  normalizeFindArticlePagesResponse(data)
)

const articles = await findArticlePages('').then(({ data }) =>
  normalizeFindArticlePagesResponse(data)
)

const newsletterSubmitEvent = (e) => {
  console.log('emitted newsletter submit event', e)

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
        <template v-if="featuredArticles">
          <div class="grid mb-6">
            <div class="col-12 xl:col-8">
              <v-card
                class="mod-vertical mod-featured mod-large"
                :image="useImageUrl(featuredArticles[0].listingImage)"
                :sizes="[1]"
                :width="871"
                :height="581"
                :title="featuredArticles[0].title"
                :titleLink="featuredArticles[0].link"
                :maxWidth="featuredArticles[0].image.width"
                :maxHeight="featuredArticles[0].image.height"
                :tags="[
                  {
                    name: featuredArticles[0].section.name,
                    slug: featuredArticles[0].section.slug,
                  },
                ]"
              >
                <p class="desc">
                  {{ featuredArticles[0].description }}
                </p>
                <div class="article-metadata">
                  <span>
                    <v-byline :authors="featuredArticles[0].authors" />
                  </span>
                  <span>comments</span>
                </div>
              </v-card>
            </div>
            <div class="col-12 xl:col-4">
              <hr class="black mb-3" />
              <div class="mb-3">LATEST</div>
              <div
                v-for="article in featuredArticles.slice(
                  1,
                  featuredArticles.length
                )"
                :key="article.uuid"
              >
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
          <p>donation component goes here</p>
          <hr class="black mt-4 mb-3" />
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
    <section>
      <div class="content">
        <newsletter-home @submitEventEmit="newsletterSubmitEvent" />
      </div>
    </section>
  </div>
</template>
