<script setup lang="ts">
import VCard from '@nypublicradio/nypr-design-system-vue3/v2/src/components/VCard.vue'

const route = useRoute()

const { title: sectionTitle, id: sectionId } = await findPage(
  route?.params?.sectionSlug as string
).then(({ data }) => normalizeFindPageResponse(data))

const articles = await findArticlePages({
  descendant_of: sectionId,
  offset: 5,
}).then(({ data }) => normalizeFindArticlePagesResponse(data))
const articlesToShow = ref(6)

const { $analytics } = useNuxtApp()
onMounted(() => {
  $analytics.sendPageView({ page_type: 'section_page' })
})

const newsletterSubmitEvent = () => {
  $analytics.sendEvent('click_tracking', {
    event_category: 'Click Tracking - Footer - Newsletter',
    component: 'footer',
    event_label: 'Newsletter',
  })
}
</script>

<template>
  <div>
    <section class="section-page">
      <div class="content">
        <h1 class="mb-5">{{ sectionTitle }}</h1>
        <hr class="black" />
        <!-- featured area -->
        <h2 class="sr-only">Featured {{ sectionTitle }} Stories</h2>
        <article-recirculation
          :slug="(route?.params?.sectionSlug as string)"
          id="article-recirculation"
          class="my-6"
        />
        <div class="mb-6">
          <HtlAd layout="rectangle" slot="htlad-gothamist_interior_midpage_1" />
        </div>
        <!-- articles -->
        <div v-if="articles" class="grid gutter-x-xl">
          <h2 class="sr-only">Latest {{ sectionTitle }} Articles</h2>
          <div class="col-1 hidden xl:block"></div>
          <div class="col">
            <div
              v-for="(article, index) in articles.slice(0, articlesToShow)"
              :key="index"
            >
              <v-card
                class="mod-horizontal mb-5"
                :image="useImageUrl(article.listingImage)"
                :title="article.listingTitle"
                :titleLink="article.link"
                :ratio="[3, 2]"
                :width="318"
                :height="214"
                :maxWidth="article.listingImage?.width"
                :maxHeight="article.listingImage?.height"
              >
                <p>
                  {{ article.description }}
                </p>
                <v-card-metadata :article="article" />
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
          <div class="col-fixed mx-auto hidden xl:block">
            <HtlAd layout="rectangle" slot="htlad-gothamist_interior_river" />
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
.page.sectionSlug {
  background: linear-gradient(
    180deg,
    #f3f3e4 120px,
    rgba(255, 255, 255, 0) 720px,
    rgba(255, 255, 255, 0) 100%
  );
}
.section-page .v-card {
  background-color: transparent;
}
.section-page .card-details {
  overflow: visible;
}
</style>
