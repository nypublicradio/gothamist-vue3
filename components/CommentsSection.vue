<script setup>
//import { onBeforeMount, onMounted } from 'vue'
import { useRuntimeConfig } from '#app'
const config = useRuntimeConfig()

const props = defineProps({
  article: {
    type: Object,
    default: null,
  },
})

const getArticleTagsString = () => {
  const tags = props.article.tags || []
  return tags.map((tag) => tag.name).join(', ')
}
useHead({
  script: [
    {
      src: `https://launcher.spot.im/spot/${config.OPENWEB_SPOT_ID}`,
      'data-spotim-module': 'spotim-launcher',
      // 'data-post-url': props.article.url,
      // 'data-article-tags': getArticleTagsString(),
      // 'data-post-id': String(props.article.legacyId || props.article.uuid),
      body: true,
    },
  ],
})

console.log('article is', props.article)
</script>

<template>
  <div class="comments-section">
    <div
      data-spotim-module="conversation"
      :data-post-url="article.url"
      :data-article-tags="getArticleTagsString()"
      :data-post-id="String(article.legacyId || article.uuid)"
    ></div>
  </div>
</template>

<style lang="scss">
.comments-section {
}
</style>
