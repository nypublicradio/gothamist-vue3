<script async setup>
import VCard from '@nypublicradio/nypr-design-system-vue3/v2/src/components/VCard.vue'
const props = defineProps({
  article: {
    type: Object,
    default: {},
  },
  limit: {
    type: Number,
    default: 3,
  },
})
const relatedLinks = ref(null)
const relatedLinksArr = ref([])
const theLimit = ref(
  props.article.relatedLinks.length < props.limit
    ? props.article.relatedLinks.length
    : props.limit
)

const pushArticleDataToArray = async (item) => {
  // get article data by id
  const articleData = await useAviary(`pages/${item.value.page}`)
  relatedLinksArr.value.push({
    id: item.id,
    type: item.type,
    article: articleData,
    titleOverride: item.value.titleOverride,
  })
  //console.log('relatedLinksArr = ', relatedLinksArr.value)
}
const pushLinkDataToArray = (item) => {
  relatedLinksArr.value.push({
    id: item.id,
    type: item.type,
    image: item.value.thumbnail,
    titleOverride: item.value.title,
    url: item.value.url,
  })
  //console.log('relatedLinksArr = ', relatedLinksArr.value)
}

props.article.relatedLinks.slice(0, theLimit.value).map(async (item, index) => {
  if (item.type === 'cms_page') {
    await pushArticleDataToArray(item)
  } else if (item.type === 'external_link') {
    await pushLinkDataToArray(item)
  }
})

watch(relatedLinksArr.value, (val) => {
  if (val.length === theLimit.value) {
    relatedLinks.value = val
  }
})
</script>

<template>
  <div>
    <div v-if="relatedLinks" class="related-links mb-7">
      <hr class="black mb-2" />
      <div class="type-label3 mb-4">Related stories</div>
      <horizontal-drag :articles="relatedLinks" v-slot="slotProps">
        <v-card
          v-if="
            slotProps.article.type === 'cms_page' &&
            !slotProps.article.article.data.value.slides
          "
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
            slotProps.article.article.data.value.leadAsset[0].value.image
              ?.height
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
          v-else-if="slotProps.article.type === 'external_link'"
          class="mod-horizontal mod-left mod-small mb-0"
          :image="useImageUrl(slotProps.article.image)"
          :title="slotProps.article.titleOverride"
          :titleLink="slotProps.article.url"
        >
        </v-card>
      </horizontal-drag>
    </div>
  </div>
</template>

<style lang="scss">
.related-links {
}
</style>
