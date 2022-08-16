<script setup lang="ts">
import VCard from '@nypublicradio/nypr-design-system-vue3/v2/src/components/VCard.vue'

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
        :image="useImageUrl(article.listingImage)"
        :title="article.listingTitle || article.title"
        :titleLink="article.link"
        :ratio="[3, 2]"
        :width="318"
        :height="214"
        :maxWidth="article.listingImage?.width"
        :maxHeight="article.listingImage?.height"
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
    </div>
  </div>
</template>
