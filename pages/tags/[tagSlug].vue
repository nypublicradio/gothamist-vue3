<script setup lang="ts">
import { TagPage } from '../../composables/types/Page'
import VCard from '@nypublicradio/nypr-design-system-vue3/v2/src/components/VCard.vue'
import VByline from '@nypublicradio/nypr-design-system-vue3/v2/src/components/VByline.vue'
import VImageWithCaption from '@nypublicradio/nypr-design-system-vue3/v2/src/components/VImageWithCaption.vue'

const { $analytics, $htlbid } = useNuxtApp()
const route = useRoute()
const tagSlug = route.params.tagSlug
const curatedTagPage = await findPage(`tags/${tagSlug}`).then(
  ({ data }) => data?.value && (normalizeFindPageResponse(data) as TagPage)
)

const articlesToShow = ref(10)

const articles = await findArticlePages({
  tag_slug: tagSlug,
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
    <section class="tag-page-header py-1">
      <h1 class="m-3 lg:m-5 tag-large">
        {{ curatedTagPage?.title || tagName }}
      </h1>
    </section>
    <section v-if="curatedTagPage?.headerImage" class="tag-page-header-image">
      <v-image-with-caption
        loading="eager"
        :image="useImageUrl(curatedTagPage.headerImage)"
        :width="1440"
        :height="288"
        :sizes="[1]"
        :alt-text="curatedTagPage.headerImage.alt"
        :maxWidth="curatedTagPage.headerImage.width"
        :maxHeight="curatedTagPage.headerImage.height"
        :ratio="[5, 1]"
      />
    </section>
    <section v-if="curatedTagPage?.topPageZone" class="tag-page-top-zone">
      <div class="content mt-0 lg:mt-3">
        <v-streamfield
          :streamfield-blocks="curatedTagPage.topPageZone"
          class="pt-4 lg:pt-6"
        />
      </div>
    </section>
    <section v-if="articles">
      <div class="content">
        <div class="grid gutter-x-xl">
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
                    slug: `/${article.section.slug}`,
                  },
                ]"
              >
                <p>
                  {{ article.description }}
                </p>
                <v-card-metadata :article="article" />
              </v-card>
              <hr class="mb-5" />
              <!-- mid page zone should go after the third article -->
              <div
                v-if="index === 2 && curatedTagPage?.midPageZone"
                class="tag-page-mid-zone my-8"
              >
                <v-streamfield
                  :streamfield-blocks="curatedTagPage.midPageZone"
                />
              </div>
            </div>
            <Button
              v-if="articlesToShow < articles.length"
              class="p-button-rounded"
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
              width="300"
              height="600"
              alt="advertisement"
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
.tag-page-header {
  background: var(--black);
}

.tag-page-top-zone .streamfield {
  border-top: 1px solid var(--black);
}

.tag-page-top-zone .streamfield p {
  font-size: var(--font-size-6);
  line-height: var(--font-size-9);
}
</style>
