<script setup lang="ts">
import VCard from '@nypublicradio/nypr-design-system-vue3/v2/src/components/VCard.vue'
import { ref, onMounted, onBeforeUnmount } from 'vue'

// this component is used in the articleSlug at the bottom of the article page, and also as the topper in the section index page

const props = defineProps({
  // the article to filter out from the results if it exists
  article: {
    type: Object,
    default: {},
  },
  slug: {
    type: String,
    default: 'news',
  },
  // A heading for the accessibility tree. Invisible in the design but will label this
  // section for screen readers. Only needed if you're not already providing a heading
  // to this section in the layout where you put this component
  accessibleHeading: {
    type: String,
    default: null
  },
})

const routeSectionSlug = ref(props.slug)
const { title: sectionTitle, id: sectionId } = await findPage(
  routeSectionSlug.value as string
).then(({ data }) => normalizeFindPageResponse(data))

const articles = await findArticlePages({
  descendant_of: sectionId,
  limit: 6,
}).then(({ data }) => normalizeFindArticlePagesResponse(data))

// remove the current article from the list of articles
const articlesFiltered = articles.filter(
  (article) => article.id !== props.article?.id
)

const articleLg = ref(articlesFiltered[0])
const articleMd = ref(articlesFiltered[1])
const articlesSm = ref([
  articlesFiltered[2],
  articlesFiltered[3],
  articlesFiltered[4],
])
</script>

<template>
  <div>
    <div v-if="articles" class="recirculation">
      <div class="grid gutter-x-30">
        <div class="col-12 xl:col-8">
          <h2 v-if="accessibleHeading" class="sr-only">{{accessibleHeading}}</h2>
          <v-card
            class="article-lg mod-vertical mod-featured2 mod-large mb-4"
            :image="useImageUrl(articleLg?.listingImage)"
            :sizes="[1]"
            :width="897"
            :height="598"
            :title="articleLg?.listingTitle"
            :titleLink="articleLg?.link"
            :maxWidth="articleLg?.listingImage?.width"
            :maxHeight="articleLg?.listingImage?.height"
            loading="eager"
          >
            <v-card-metadata
              class="mt-0 md:mt-2"
              altDesign
              :article="articleLg"
            />
          </v-card>
          <hr class="block xl:hidden mb-3" />
        </div>
        <div class="col-12 xl:col-4">
          <!-- md article desktop  -->
          <v-card
            class="hidden xl:flex article-md mod-vertical mod-large mb-5"
            :image="useImageUrl(articleMd?.listingImage)"
            :title="articleMd?.listingTitle"
            :titleLink="articleMd?.link"
            :ratio="[3, 2]"
            :width="433"
            :height="289"
            :sizes="[1]"
            :maxWidth="articleMd?.listingImage?.width"
            :maxHeight="articleMd?.listingImage?.height"
            loading="eager"
          >
            <p>
              {{ articleMd?.description }}
            </p>
            <v-card-metadata stack :article="articleMd" />
          </v-card>
          <!-- md article mobile  -->
          <v-card
            class="flex xl:hidden article-md mod-horizontal mod-left tag-small mb-5"
            :image="useImageUrl(articleMd?.listingImage)"
            :title="articleMd?.listingTitle"
            :titleLink="articleMd?.link"
            :width="318"
            :height="212"
            :sizes="[1]"
            :maxWidth="articleMd?.listingImage?.width"
            :maxHeight="articleMd?.listingImage?.height"
            loading="eager"
          >
            <p>
              {{ articleMd?.description }}
            </p>
            <v-card-metadata :article="articleMd" />
          </v-card>
          <hr class="my-3" />
          <horizontal-drag :articles="articlesSm" v-slot="slotProps">
            <v-card
              class="article-sm mod-horizontal mod-small mb-3 tag-small"
              :title="slotProps.article.listingTitle"
              :titleLink="slotProps.article.link"
            >
              <v-card-metadata
                :article="slotProps.article"
                :showComments="false"
              />
            </v-card>
          </horizontal-drag>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.recirculation {
  .v-card {
    background: transparent;
    &.article-sm {
      .card-title-link .h2 {
        font-weight: 600 !important;
      }
      .card-slot {
        justify-content: end;
      }
    }
    &.article-md {
      gap: 1rem !important;
    }
  }
  .v-hr:not(:last-child) {
    @include media('<xl') {
      border-right: 1px solid #ebebeb !important;
    }
  }
}
</style>
