<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useUpdateCommentCounts } from '~~/composables/comments';
import { ArticlePage } from '~~/composables/types/Page';
// this component is used in the articleSlug at the bottom of the article page, and also as the topper in the section index page

const props = withDefaults(defineProps<{
  // the article to filter out from the results if it exists
  article?: ArticlePage
  slug?: string
  trackingComponentLocation?: string
}>(), {
  article: null,
  slug: 'news',
  trackingComponentLocation: "Recirculation Module"
})

const trackingComponent = "Recirculation Module"

const routeSectionSlug = ref(props.slug)
const { title: sectionTitle, id: sectionId } = await findPage(
  routeSectionSlug.value as string
).then(({ data }) => normalizeFindPageResponse(data))

const articles = await findArticlePages({
  sponsored_content: false,
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

onMounted(async () => {
  await useUpdateCommentCounts(articles)
})

</script>

<template>
  <div>
    <div v-if="articles" class="recirculation">
      <div class="grid gutter-x-30">
        <div class="col-12 xl:col-8">
          <gothamist-card
            v-slot="card"
            :article="articleLg"
            class="article-lg mod-vertical mod-featured2 mod-large mb-4"
            :width="897"
            :height="598"
            :hideTags="true"
            loading="eager"
            :trackClicks="true"
            :trackingComponent="trackingComponent"
            :trackingComponentLocation="trackingComponentLocation"
            :trackingComponentPosition="1"
          >
            <v-card-metadata
              class="mt-0 md:mt-2"
              altDesign
              :article="articleLg"
              @link-click="$event => card.trackClick($event)"
            />
          </gothamist-card>
          <hr class="block xl:hidden mb-3" />
        </div>
        <div class="col-12 xl:col-4">
          <!-- md article desktop  -->
          <gothamist-card
            v-slot="card"
            :article="articleMd"
            class="hidden xl:flex article-md mod-vertical mod-large mb-5"
            :width="433"
            :height="289"
            :hideTags="true"
            loading="eager"
            :trackClicks="true"
            :trackingComponent="trackingComponent"
            :trackingComponentLocation="trackingComponentLocation"
            :trackingComponentPosition="2"
          >
            <p>
              {{ articleMd?.description }}
            </p>
            <v-card-metadata
              stack
              :article="articleMd"
              @link-click="$event => card.trackClick($event)"
            />
          </gothamist-card>
          <!-- md article mobile  -->
          <gothamist-card
            v-slot="card"
            :article="articleMd"
            class="flex xl:hidden article-md mod-horizontal mod-left tag-small mb-5"
            :width="318"
            :height="212"
            loading="eager"
          >
            <p>
              {{ articleMd?.description }}
            </p>
            <v-card-metadata
              :article="articleMd"
              @link-click="$event => card.trackClick($event)"
            />
          </gothamist-card>
          <hr class="my-3" />
          <horizontal-drag :items="articlesSm" v-slot="slotProps">
            <gothamist-card
              v-slot="card"
              :article="slotProps.item"
              class="article-sm mod-horizontal mod-small mb-3 tag-small"
              :hide-image="true"
              :hide-tags="true"
              :trackClicks="true"
              :trackingComponent="trackingComponent"
              :trackingComponentLocation="trackingComponentLocation"
              :trackingComponentPosition="slotProps.index + 3"
            >
              <v-card-metadata
                :article="slotProps.item"
                @link-click="$event => card.trackClick($event)"
              />
            </gothamist-card>
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
