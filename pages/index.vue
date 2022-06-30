<script setup lang="ts">
import { fuzzyDateTime } from '../utilities/date'
import VCard from '@nypublicradio/nypr-design-system-vue3/v2/src/components/VCard.vue'
import VByline from '@nypublicradio/nypr-design-system-vue3/v2/src/components/VByline.vue'

const config = useRuntimeConfig()

const articles = await findArticlePages('').then(({ data }) =>
  normalizeFindArticlePagesResponse(data)
)

onMounted(() => {
  const { $analytics } = useNuxtApp()
  $analytics.sendPageView({ page_type: 'home_page' })
})
</script>

<template>
  <div>
    <template v-if="articles">
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
    </template>
  </div>
</template>

<style lang="scss"></style>
