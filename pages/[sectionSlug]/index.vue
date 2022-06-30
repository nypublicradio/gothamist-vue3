<script setup lang="ts">
import { fuzzyDateTime } from '~~/utilities/date'
import VCard from '@nypublicradio/nypr-design-system-vue3/v2/src/components/VCard.vue'
import VByline from '@nypublicradio/nypr-design-system-vue3/v2/src/components/VByline.vue'

const config = useRuntimeConfig()
const route = useRoute()

const { title: sectionTitle, id: sectionId } = await findPage(
  route.params.sectionSlug as string
).then(({ data }) => normalizeFindPageResponse(data))

const articles = await findArticlePages({ descendant_of: sectionId }).then(
  ({ data }) => normalizeFindArticlePagesResponse(data)
)

onMounted(() => {
  const { $analytics } = useNuxtApp()
  $analytics.sendPageView({ page_type: 'section_page' })
})
</script>

<template>
  <div>
    <h1>{{ sectionTitle }}</h1>
    <div v-for="article in articles" :key="article.uuid">
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
