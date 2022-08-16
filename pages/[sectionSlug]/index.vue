<script setup lang="ts">
import VCard from '@nypublicradio/nypr-design-system-vue3/v2/src/components/VCard.vue'

const route = useRoute()

const { title: sectionTitle, id: sectionId } = await findPage(
  route.params.sectionSlug as string
).then(({ data }) => normalizeFindPageResponse(data))

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
        <h1 class="mb-5">{{ sectionTitle }}</h1>
        <hr class="black" />
        <!-- featured area -->
        <article-recirculation
          id="article-recirculation"
          class="my-6"
          :showAsFeature="true"
        />
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
.section-page .card-details {
  overflow: visible;
}
</style>
