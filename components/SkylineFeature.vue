<script setup>
import VCard from '@nypublicradio/nypr-design-system-vue3/v2/src/components/VCard.vue'
import { ref } from 'vue'

const props = defineProps({
  collection: {
    type: Object,
    default: {},
    required: true,
  },
})
// Note: the skyline feature should display the first 3 stories in the content collection
const articleLg = ref(normalizeArticlePage(props.collection.data[0]))
const articleMd = ref(normalizeArticlePage(props.collection.data[1]))
const articleSm = ref(normalizeArticlePage(props.collection.data[2]))

const featureLable = ref(props.collection.label)

console.log('collection  = ', props.collection)
</script>

<template>
  <div>
    <div v-if="props.collection" class="skyline-feature">
      <hr class="black" />
      <p
        role="heading"
        aria-level="2"
        v-if="featureLable"
        class="type-label3 mt-2 mb-4"
      >
        {{ featureLable }}
      </p>
      <div class="grid gutter-x-30 flex-row-reverse">
        <div class="col-12 xl:col-6">
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
        <div class="col-12 xl:col-3">
          <!-- md article desktop  -->
          <v-card
            class="article-md mod-vertical mod-large mb-5"
            :image="useImageUrl(articleMd?.listingImage)"
            :title="articleMd?.listingTitle"
            :titleLink="articleMd?.link"
            :ratio="[1, 1]"
            :width="318"
            :height="318"
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
        </div>
        <div class="col-12 xl:col-3">
          <!-- sm article desktop  -->
          <v-card
            class="article-sm mod-vertical mod-large mb-5"
            :image="useImageUrl(articleSm?.listingImage)"
            :title="articleSm?.listingTitle"
            :titleLink="articleSm?.link"
            :ratio="[3, 2]"
            :width="318"
            :height="212"
            :sizes="[1]"
            :maxWidth="articleSm?.listingImage?.width"
            :maxHeight="articleSm?.listingImage?.height"
            loading="eager"
          >
            <p>
              {{ articleSm?.description }}
            </p>
            <v-card-metadata stack :article="articleSm" />
          </v-card>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.skyline-feature {
}
</style>
