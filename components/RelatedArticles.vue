<script setup lang="ts">
import { computed } from 'vue'
import VFlexibleLink from '@nypublicradio/nypr-design-system-vue3/v2/src/components/VFlexibleLink.vue'
import VCard from '@nypublicradio/nypr-design-system-vue3/v2/src/components/VCard.vue'
import { ArticlePage } from '~~/composables/types/Page.js'
import Navigation from '~~/composables/types/Navigation.js'

const props = defineProps<{
  article: ArticlePage[]
  navigation: Navigation
}>()

const relatedLinksLimit = 3
const relatedLinks = ref([])
const relatedLinksArr = ref([])
const relatedLinksPropArr = props.article.relatedLinks

// get article data by id
const pushArticleDataToArray = async (item) => {
  const articleData = await useAviary(`pages/${item.value.page}`)
  relatedLinksArr.value.push({
    id: item.id,
    type: item.type,
    article: articleData,
    titleOverride: item.value.titleOverride,
  })
  console.log('relatedLinksArr = ', relatedLinksArr.value)
}
// get article data by id
const pushLinkDataToArray = async (item) => {
  relatedLinksArr.value.push({
    id: item.id,
    type: item.type,
    image: item.value.thumbnail,
    titleOverride: item.value.title,
    url: item.value.url,
  })
  console.log('relatedLinksArr = ', relatedLinksArr.value)
}

// loop through related links and push to array
relatedLinksPropArr.map((item, index) => {
  console.log('index = ', index)
  console.log('item = ', item)
  if (index >= relatedLinksLimit) return
  if (item.type === 'cms_page') {
    pushArticleDataToArray(item)
  } else if (item.type === 'external_link') {
    pushLinkDataToArray(item)
  }
})

onMounted(async () => {
  await Promise.all(relatedLinksArr.value).then((data) => {
    relatedLinks.value = data
  })
})
</script>

<template>
  <div v-if="relatedLinks.length > 0" class="related-articles mb-7">
    <hr class="black mb-2" />
    <div class="type-label3 mb-4">Related stories</div>
    <horizontal-drag :articles="relatedLinks" v-slot="slotProps" isVertical>
      <v-card
        v-if="slotProps.article.type === 'cms_page'"
        class="mod-horizontal mod-left mod-small mb-0"
        :image="
          useImageUrl(
            slotProps.article.article.data.value.leadAsset[0].value.image
          )
        "
        :width="106"
        :height="70"
        :sizes="[2]"
        :title="
          slotProps.article.titleOverride ||
          slotProps.article.article.data.value.listingTitle ||
          slotProps.article.article.data.value.title
        "
        :titleLink="slotProps.article.article.data.value.meta.slug"
        :maxWidth="
          slotProps.article.article.data.value.leadAsset[0].value.image?.width
        "
        :maxHeight="
          slotProps.article.article.data.value.leadAsset[0].value.image?.height
        "
        :quality="80"
      >
        <div></div>
        <v-card-metadata
          :article="slotProps.article.article.data.value"
          :showComments="false"
        />
      </v-card>
      <v-card
        v-else="slotProps.article.type === 'external_link'"
        class="mod-horizontal mod-left mod-small mb-0"
        :image="useImageUrl(slotProps.article.image)"
        :title="slotProps.article.titleOverride"
        :titleLink="slotProps.article.url"
      >
      </v-card>
    </horizontal-drag>
  </div>
</template>

<style lang="scss">
.related-articles {
}
</style>
