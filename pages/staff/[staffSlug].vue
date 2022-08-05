<script setup lang="ts">
import { ref } from 'vue'
import { StaffPage } from '../../composables/types/Page'
import VCard from '@nypublicradio/nypr-design-system-vue3/v2/src/components/VCard.vue'
import VByline from '@nypublicradio/nypr-design-system-vue3/v2/src/components/VByline.vue'

const { $analytics, $htlbid } = useNuxtApp()
const route = useRoute()
const staffSlug = route.params.staffSlug
console.log('staffSlug = ', staffSlug)
const curatedStaffPage = await findPage(`staff/${staffSlug}`).then(
  ({ data }) => data?.value && (normalizeFindPageResponse(data) as StaffPage)
)

const articlesToShow = ref(6)

const articles = await findArticlePages({
  author_slug: staffSlug,
  //  limit: 12,
  offset: 0,
}).then(({ data }) => normalizeFindArticlePagesResponse(data))

const getAuthorName = () => {
  var splitStr = staffSlug.toLowerCase().split('-')
  for (var i = 0; i < splitStr.length; i++) {
    splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1)
  }
  return splitStr.join(' ')
}

const authorProfileData = articles[0]?.authors.find(
  (author) => author.name === getAuthorName()
)

onMounted(() => {
  $analytics.sendPageView({ page_type: 'staff_page' })
  $htlbid.setTargeting({ Template: 'Staff' })
})

onUnmounted(() => {
  $htlbid.clearTargeting({ Template: 'Staff' })
})
</script>

<template>
  <div>
    <section>
      <div class="content">
        <article-footer-profile
          :profileData="authorProfileData"
          class="mb-4 md:mb-6"
          :showCta="false"
        />
        <div
          v-for="article in articles.slice(0, articlesToShow)"
          :key="article.uuid"
        >
          <div v-if="curatedStaffPage?.topPageZone">
            <pre>{{ curatedStaffPage.topPageZone }}</pre>
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
                slug: `/tags/${article.section.slug}`,
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
          class="p-button-rounded"
          label="Load More"
          @click="articlesToShow += 6"
        >
        </Button>
      </div>
    </section>
  </div>
</template>
