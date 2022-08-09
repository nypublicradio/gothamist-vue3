<script setup lang="ts">
import { ref } from 'vue'
//import { StaffPage } from '../../composables/types/Page'
import VCard from '@nypublicradio/nypr-design-system-vue3/v2/src/components/VCard.vue'
import VByline from '@nypublicradio/nypr-design-system-vue3/v2/src/components/VByline.vue'

const { $analytics, $htlbid } = useNuxtApp()
const route = useRoute()
const staffSlug = route.params.staffSlug
// const curatedStaffPage = await findPage(`staff/${staffSlug}`).then(
//   ({ data }) => data?.value && (normalizeFindPageResponse(data) as StaffPage)
// )

const articlesToShow = ref(6)

const articles = await findArticlePages({
  author_slug: staffSlug,
  //  limit: 12,
  offset: 0,
}).then(({ data }) => normalizeFindArticlePagesResponse(data))

// find a match of the slug in the articles' authors array and return the matched author's data
const authorProfileData = articles[1]?.authors.find((author) => {
  if (author.slug === staffSlug) return author
})

// formats the name of the author by manipulating the slug. This is used when authorProfileData returns no data
const getAuthorNameFromSlug = () => {
  var splitStr = staffSlug.toLowerCase().split('-')
  for (var i = 0; i < splitStr.length; i++) {
    splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1)
  }
  return splitStr.join(' ')
}

// emitted event from the newsletter submission form
const newsletterSubmitEvent = (e) => {
  //emitted newsletter submit event, @Matt, not exactly sure how to get this work like you mentioned.
  // sendEvent('click_tracking', {
  //   event_category: 'Click Tracking',
  //   component: 'Footer',
  //   event_label: 'Become a member',
  // })
}

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
        <div class="grid gutter-x-30">
          <div class="col-12">
            <h2>Articles by</h2>
            <hr class="black mt-3 md:mt-6 mb-2" />
          </div>
          <div class="col mb-6">
            <author-profile
              v-if="authorProfileData"
              :profileData="authorProfileData"
              :showCta="false"
              staffPage
            />
            <h5 v-else>{{ getAuthorNameFromSlug() }}</h5>
          </div>
          <div class="col-fixed col-fixed-width-330 hidden xl:block"></div>
        </div>
        <div class="grid gutter-x-30">
          <div v-if="articles" class="col">
            <div
              v-for="article in articles.slice(0, articlesToShow)"
              :key="article.uuid"
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

        <div class="mt-8 mb-5">
          <hr class="black mb-4" />
          <newsletter-home @submit="newsletterSubmitEvent" />
        </div>
      </div>
    </section>
  </div>
</template>