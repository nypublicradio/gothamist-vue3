<script setup lang="ts">
import VCard from '@nypublicradio/nypr-design-system-vue3/v2/src/components/VCard.vue'

const route = useRoute()

const { title: sectionTitle, id: sectionId } = await findPage(
  route.params.sectionSlug as string
).then(({ data }) => normalizeFindPageResponse(data))

const latestArticles = await findArticlePages({
  descendant_of: sectionId,
  show_as_feature: true,
}).then(({ data }) => normalizeFindArticlePagesResponse(data))

const articles = await findArticlePages({
  descendant_of: sectionId,
  show_as_feature: false,
}).then(({ data }) => normalizeFindArticlePagesResponse(data))
const articlesToShow = ref(6)

onMounted(() => {
  const { $analytics } = useNuxtApp()
  $analytics.sendPageView({ page_type: 'section_page' })
})

const newsletterSubmitEvent = (e) => {
  //emitted newsletter submit event, @Matt, not exactly sure how to get this work like you mentioned.
  // sendEvent('click_tracking', {
  //   event_category: 'Click Tracking',
  //   component: 'Footer',
  //   event_label: 'Become a member',
  // })
}
</script>

<template>
  <div>
    <section class="section-page">
      <div class="content">
        <h1 class="pb-5 mb-6">{{ sectionTitle }}</h1>
        <!-- featured area -->
        <template v-if="latestArticles">
          <div class="grid mb-6 gutter-x-30">
            <div v-if="latestArticles.length > 0" class="col-12 xl:col-8">
              <v-card
                class="featured-article mod-vertical mod-featured mod-large"
                loading="eager"
                :image="useImageUrl(latestArticles[0].listingImage)"
                :sizes="[1]"
                :width="897"
                :height="598"
                :title="latestArticles[0].title"
                :titleLink="latestArticles[0].link"
                :maxWidth="latestArticles[0].listingImage.width"
                :maxHeight="latestArticles[0].listingImage.height"
                :tags="[
                  {
                    name: latestArticles[0].section.name,
                    slug: latestArticles[0].section.slug,
                  },
                ]"
              >
                <div class="grid mt-1">
                  <div class="col-12 xl:col-6">
                    <p class="desc">
                      {{ latestArticles[0].description }}
                    </p>
                  </div>
                  <div class="separator col-fixed mt-2 ml-2"></div>
                  <div class="col-12 xl:col-5">Byline Goes Here</div>
                </div>
                <div class="article-metadata">
                  <span>comments</span>
                </div>
              </v-card>
            </div>
            <div v-if="latestArticles.length > 4" class="col-12 xl:col-4">
              <v-card
                class="mod-vertical mod-large mb-4"
                loading="eager"
                :image="useImageUrl(latestArticles[1].listingImage)"
                :width="665"
                :height="448"
                :sizes="[1]"
                :title="latestArticles[1].title"
                :titleLink="latestArticles[1].link"
                :maxWidth="latestArticles[1].listingImage.width"
                :maxHeight="latestArticles[1].listingImage.height"
                :tags="[
                  {
                    name: latestArticles[1].section.name,
                    slug: latestArticles[1].section.slug,
                  },
                ]"
              >
                <p class="desc">
                  {{ latestArticles[0].description }}
                </p>
                <div class="article-metadata">
                  <span>
                    <v-byline :authors="latestArticles[1].authors" />
                  </span>
                  <span>comments</span>
                </div>
              </v-card>
              <div
                v-for="article in latestArticles.slice(2, 5)"
                :key="article.uuid"
              >
                <hr class="mb-4" />
                <v-card
                  class="mod-horizontal mod-left mod-small mb-4 tag-small latest-articles"
                  :title="article.title"
                  :titleLink="article.link"
                >
                  <div class="article-metadata">
                    <span>
                      <v-byline :authors="article.authors" />
                    </span>
                    <span>comments</span>
                  </div>
                </v-card>
              </div>
            </div>
          </div>
        </template>
        <!-- articles -->
        <div v-if="articles" class="grid gutter-x-xl">
          <div class="col-1 hidden xl:block"></div>
          <div class="col">
            <div
              v-for="(article, index) in articles.slice(0, articlesToShow)"
              :key="index"
            >
              <v-card
                class="mod-horizontal mb-5"
                :image="useImageUrl(article.listingImage)"
                :title="article.title"
                :titleLink="article.link"
                :ratio="[3, 2]"
                :width="318"
                :height="214"
                :maxWidth="article.listingImage.width"
                :maxHeight="article.listingImage.height"
                :tags="[
                  {
                    name: article.section.name,
                    slug: article.section.slug,
                  },
                ]"
              >
                <p>
                  {{ article.description }}
                </p>
                <div class="article-metadata">
                  <span>
                    <v-byline :authors="article.authors" />
                  </span>
                  <span>comments go here</span>
                </div>
              </v-card>
              <hr class="mb-5" />
            </div>
            <Button
              v-if="articlesToShow < articles.length"
              class="p-button-rounded mb-8"
              label="Load More"
              @click="articlesToShow += 10"
            >
            </Button>
          </div>

          <div class="col-fixed mx-auto">
            <img
              class="mb-4 xl:mb-7"
              src="https://fakeimg.pl/300x600/?text=AD Here"
              style="max-width: 100%"
            />
          </div>
        </div>
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
.section-page .v-card {
  background-color: transparent;
}
.section-page h1 {
  font-size: var(--font-size-17);
  text-transform: uppercase;
  border-bottom: solid 1px var(--black);
}
.section-page .featured-article .grid .separator {
  display: none;
  @include media('>xl') {
    display: block;
    height: 44px;
    border-left: solid 1px var(--black300);
  }
}
.section-page .card-details {
  overflow: visible;
}
.section-page .v-card.mod-featured .card-details .card-title .h2 {
  font-size: var(--font-size-17);
  line-height: var(--font-size-17);
}
.section-page .v-card.mod-featured.mod-large .card-details .card-title .v-tag {
  margin-top: 26px;
  @include media('>lg') {
    margin-top: 8px;
  }
}
.section-page
  .mod-vertical:not(.mod-featured)
  .card-details
  .card-title
  .v-tag {
  margin-top: -6px;
}
.section-page .mod-vertical:not(.mod-featured) .card-details .card-title .h2 {
  font-size: var(--font-size-8);
  line-height: var(--font-size-9);
}
.section-page .v-card.mod-small.latest-articles .card-details .card-title .h2 {
  font-weight: 600;
}
.section-page .mod-vertical .card-details {
  padding-left: 0;
  padding-right: 0;
}
</style>
