<script setup lang="ts">
import VCard from '@nypublicradio/nypr-design-system-vue3/v2/src/components/VCard.vue'
import { ref, computed, onMounted } from 'vue'

const props = defineProps({
  sectionSlug: {
    type: String,
    default: '',
  },
})

const { title: sectionTitle, id: sectionId } = await findPage(
  props.sectionSlug as string
).then(({ data }) => normalizeFindPageResponse(data))

const articles = await findArticlePages({
  descendant_of: sectionId,
  limit: 5,
  offset: 1,
}).then(({ data }) => normalizeFindArticlePagesResponse(data))
console.log('section articles = ', articles)
const sectionName = ref(sectionTitle)
const articleLg = ref(articles[0])
const articleMd = ref(articles[1])
const articlesSm = ref([articles[2], articles[3], articles[4]])
</script>

<template>
  <div>
    <div v-if="articles" class="recirculation">
      <hr class="black" />
      <p class="type-label3 mt-2 mb-4">MORE {{ sectionName }}</p>

      <div class="grid gutter-x-30">
        <div class="col-12 xl:col-8">
          <v-card
            class="article-lg mod-vertical mod-featured2 mod-large mb-4"
            :image="useImageUrl(articleLg.listingImage)"
            :sizes="[1]"
            :width="897"
            :height="598"
            :title="articleLg.title"
            :titleLink="articleLg.link"
            :maxWidth="articleLg.listingImage.width"
            :maxHeight="articleLg.listingImage.height"
            :tags="[
              {
                name: articleLg.section.name,
                slug: `/${articleLg.section.slug}`,
              },
            ]"
          >
            <p class="desc">
              {{ articleLg.description }}
            </p>
            <v-card-metadata :article="articleLg" />
          </v-card>
        </div>
        <div class="col-12 xl:col-4">
          <!-- md article desktop  -->
          <v-card
            class="hidden xl:flex article-md mod-vertical mod-large mb-5"
            :image="useImageUrl(articleMd.listingImage)"
            :title="articleMd.title"
            :titleLink="articleMd.link"
            :ratio="[3, 2]"
            :width="433"
            :height="289"
            :sizes="[1]"
            :maxWidth="articleMd.listingImage.width"
            :maxHeight="articleMd.listingImage.height"
            :tags="[
              {
                name: articleMd.section.name,
                slug: `/${articleMd.section.slug}`,
              },
            ]"
          >
            <p>
              {{ articleMd.description }}
            </p>
            <v-card-metadata :article="articleMd" />
          </v-card>
          <!-- md article mobile  -->
          <v-card
            class="flex xl:hidden article-md mod-horizontal mod-left tag-small mb-5"
            :image="useImageUrl(articleMd.listingImage)"
            :title="articleMd.title"
            :titleLink="articleMd.link"
            :width="318"
            :height="212"
            :sizes="[1]"
            :maxWidth="articleMd.listingImage.width"
            :maxHeight="articleMd.listingImage.height"
            :tags="[
              {
                name: articleMd.section.name,
                slug: `/${articleMd.section.slug}`,
              },
            ]"
          >
            <p>
              {{ articleMd.description }}
            </p>
            <v-card-metadata :article="articleMd" />
          </v-card>
          <hr class="my-5 block xl:hidden" />
          <div class="horz-scroll-holder">
            <div class="horz-scroll">
              <div class="grid gutter-x-xl keep-gutter horz-scroll-content">
                <template v-for="article in articlesSm" :key="article.uuid">
                  <div class="v-hr col-4 xl:col-12 flex xl:flex-column">
                    <hr class="w-full mb-3 hidden xl:block" />
                    <v-card
                      class="article-sm mod-horizontal mod-small mb-3 tag-small"
                      :title="article.title"
                      :titleLink="article.link"
                    >
                      <v-card-metadata
                        :article="article"
                        :showComments="false"
                      />
                    </v-card>
                  </div>
                </template>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.recirculation {
  .v-card {
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
  .horz-scroll-holder {
    position: relative;
    @include media('<md') {
      margin-left: -1.5rem;
      margin-right: -1.5rem;
      &:before {
        content: '';
        pointer-events: none;
        position: absolute;
        top: 0;
        right: 0;
        display: block;
        height: 100%;
        width: 100px;
        background: -moz-linear-gradient(
          left,
          rgba(255, 255, 255, 0) 0%,
          rgba(255, 255, 255, 1) 100%
        );
        background: -webkit-linear-gradient(
          left,
          rgba(255, 255, 255, 0) 0%,
          rgba(255, 255, 255, 1) 100%
        );
        background: linear-gradient(
          to right,
          rgba(255, 255, 255, 0) 0%,
          rgba(255, 255, 255, 1) 100%
        );
        filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#00ffffff', endColorstr='#ffffff',GradientType=1 );
      }
    }
    .horz-scroll {
      @include media('<md') {
        overflow-x: scroll;

        .horz-scroll-content {
          padding: 0 24px;
          width: 733px;
        }
      }
    }
  }
}
</style>
