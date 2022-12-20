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

// loop through related links and push to array
relatedLinksPropArr.map((item, index) => {
  console.log('index = ', index)
  console.log('item = ', item)
  if (index >= relatedLinksLimit) return
  pushArticleDataToArray(item)
})
</script>

<template v-if="relatedLinksArr">
  <div class="related-articles mb-7">
    <hr class="black mb-2" />
    <div class="type-label3 mb-4">Related stories</div>

    <horizontal-drag :articles="relatedLinksArr" v-slot="slotProps" isVertical>
      <v-card
        class="mod-vertical mod-small"
        :image="
          useImageUrl(
            slotProps.article.article.data.value.leadAsset[0].value.image
          )
        "
        :width="218"
        :height="145"
        :sizes="[2]"
        :title="
          slotProps.article.titleOverride ||
          slotProps.article.article.data.value.listingTitle ||
          slotProps.article.article.data.value.title
        "
        :titleLink="slotProps.article.article.data.value.link"
        :maxWidth="
          slotProps.article.article.data.value.leadAsset[0].value.image?.width
        "
        :maxHeight="
          slotProps.article.article.data.value.leadAsset[0].value.image?.height
        "
        :quality="80"
      >
      </v-card>
    </horizontal-drag>
  </div>
</template>

<style lang="scss">
.related-articles {
}
</style>
