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
    <section>
      <div class="content">
        <template v-if="articles">
          <div v-for="article in articles" :key="article.uuid">
            <v-card
              class="mod-horizontal mb-3 lg:mb-5 tag-small"
              :image="`${config.IMAGE_BASE_URL}${article.image.id}/fill-%width%x%height%|format-jpeg|jpegquality-%quality%`"
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
                <span>comments go here</span>
              </div>
            </v-card>
            <hr class="mb-3 lg:mb-5" />
          </div>
        </template>
      </div>
    </section>
  </div>
</template>

<style lang="scss"></style>
