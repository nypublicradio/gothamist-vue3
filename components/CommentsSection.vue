<script setup>
const props = defineProps({
  article: {
    type: Object,
    default: null,
  },
})

const config = useRuntimeConfig()

// return the tags as a comma separated string for openWeb comments data-article-tags
function getArticleTagsString() {
  const tags = props.article.tags || []
  return tags.map(tag => tag.name).join(', ')
}
function getArticleUrl() {
  const url = props.article.url
  return url
}
useHead({
  script: [
    {
      'src': `https://launcher.spot.im/spot/${config.public.OPENWEB_SPOT_ID}`,
      'data-spotim-module': 'spotim-launcher',
      'body': true,
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
    />
  </div>
</template>
