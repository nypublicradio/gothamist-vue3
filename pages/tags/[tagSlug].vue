<script setup lang="ts">
import { TagPage } from '../../composables/types/Page'
import VCard from '@nypublicradio/nypr-design-system-vue3/v2/src/components/VCard.vue'
import VByline from '@nypublicradio/nypr-design-system-vue3/v2/src/components/VByline.vue'

const { $analytics, $htlbid } = useNuxtApp()
const route = useRoute()
const tagSlug = route.params.tagSlug
const curatedTagPage = await findPage(`tags/${tagSlug}`).then(
  ({ data }) => data?.value && (normalizeFindPageResponse(data) as TagPage)
)
const articlesToShow = ref(6)

const articles = await findArticlePages({
  tag_slug: tagSlug,
  //limit: 12,
  offset: 0,
}).then(({ data }) => normalizeFindArticlePagesResponse(data))

const tagName =
  articles[0]?.tags.find((tag) => tag.slug === tagSlug)?.name || tagSlug

onMounted(() => {
  $analytics.sendPageView({ page_type: 'tag_page' })
  $htlbid.setTargeting({ Template: 'Tag' })
})

onUnmounted(() => {
  $htlbid.clearTargeting({ Template: 'Tag' })
})
</script>

<template>
  <div class="tag-slug">
    <section class="tag-head">
      <div class="content">
        <div class="grid">
          <div class="col-12">
            <div class="tag">
              <h2 class="text">{{ tagName }}</h2>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section>
      <div class="content">
        <div class="grid gutter-x-30">
          <div v-if="articles" class="col">
            <div
              v-for="article in articles.slice(0, articlesToShow)"
              :key="article.uuid"
            >
              <div v-if="curatedTagPage?.topPageZone">
                <pre>{{ curatedTagPage.topPageZone }}</pre>
              </div>
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
          </div>
          <p v-else class="col">No articles available</p>
          <div class="col-fixed col-fixed-width-330 hidden xl:block">
            <img
              src="https://fakeimg.pl/300x600/?text=AD Here"
              style="width: 100%; max-width: 300px"
            />
            <p class="type-fineprint">Powered by members and sponsors</p>
          </div>
        </div>
        <div class="block xl:hidden">
          <img
            src="https://fakeimg.pl/300x250/?text=AD Here"
            class="block m-auto"
            style="width: 100%; max-width: 300px"
          />
          <p class="type-fineprint text-center">
            Powered by members and sponsors
          </p>
        </div>
        <Button
          v-if="articles && articlesToShow < articles.length"
          class="p-button-rounded"
          label="Load More"
          @click="articlesToShow += 6"
        >
        </Button>
      </div>
    </section>
  </div>
</template>

<style lang="scss">
.tag-slug {
  .tag-head {
    background-color: var(--black);
    .tag {
      position: relative;
      display: flex;
      justify-content: center;
      .text {
        color: var(--soybean);
        border: 1px solid var(--soybean);
        border-radius: 30rem;
        text-align: center;
        text-transform: uppercase;
        padding: 0 2rem;
      }
    }
  }
}
</style>
