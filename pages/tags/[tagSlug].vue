<script setup lang="ts">
import { TagPage } from '../../composables/types/Page'
import { fuzzyDateTime } from '../../utilities/date'
import VCard from '@nypublicradio/nypr-design-system-vue3/v2/src/components/VCard.vue'
import VByline from '@nypublicradio/nypr-design-system-vue3/v2/src/components/VByline.vue'

const { $analytics, $htlbid } = useNuxtApp()
const route = useRoute()
const config = useRuntimeConfig()
const tagSlug = route.params.tagSlug
const curatedTagPage = await findPage(`tags/${tagSlug}`).then(
  ({ data }) => data?.value && (normalizeFindPageResponse(data) as TagPage)
)

const articles = await findArticlePages({
  tag_slug: tagSlug,
  limit: 12,
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
  <div>
    <h1>{{ tagName }}</h1>
    <div v-for="article in articles" :key="article.uuid">
      <div v-if="curatedTagPage?.topPageZone">
        <pre>{{ curatedTagPage.topPageZone }}</pre>
      </div>
      <v-card
        class="mod-horizontal mb-5"
        :image="`${config.IMAGE_BASE_URL}${article.image.id}/fill-318x214|format-jpeg|jpegquality-70`"
        :title="article.title"
        :titleLink="article.link"
        :ratio="[3, 2]"
        :width="318"
        :height="214"
        :maxWidth="article.image.width"
        :maxHeight="article.image.height"
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
</template>
