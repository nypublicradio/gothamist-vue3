<script setup>
import { useRuntimeConfig } from '#app'
const config = useRuntimeConfig()

const props = defineProps({
  article: {
    type: Object,
    default: null,
  },
})
// return the tags as a comma separated string for openWeb comments data-article-tags
const getArticleTagsString = () => {
  const tags = props.article.tags || []
  return tags.map((tag) => tag.name).join(', ')
}
const getArticleUrl = () => {
  // force the data-post-url to match the beta.gothamist.com url of the article
  // TODO: REMOVE REPLACE WHEN WE GO LIVE
  var url = props.article.url.replace('//gothamist.com', config.betaUrl)
  return url
}
useHead({
  script: [
    {
      src: `https://launcher.spot.im/spot/${config.OPENWEB_SPOT_ID}`,
      'data-spotim-module': 'spotim-launcher',
      body: true,
    },
  ],
})
</script>

<template>
  <div class="comments-section">
    <div
      data-spotim-module="conversation"
      :data-post-url="getArticleUrl()"
      :data-article-tags="getArticleTagsString()"
      :data-post-id="String(article.legacyId || article.uuid)"
    ></div>
  </div>
</template>
