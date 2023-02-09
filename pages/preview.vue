<script setup lang="ts">
import { transformResponseData } from '~~/composables/useAviary'
import { normalizeFindPageResponse } from '~~/composables/data'
import { ArticlePage, GalleryPage } from '~~/composables/types/Page'
import { usePreviewData } from '~/composables/states'

const config = useRuntimeConfig()
const route = useRoute()
const previewData = usePreviewData()

const identifier = route.query.identifier
const identifierId = identifier.slice(3)
const token = route.query.token

const formatData = (data) => {
  const transformedData = transformResponseData(data)
  const normalizedData = normalizeFindPageResponse(
    transformedData
  ) as ArticlePage
  return normalizedData
}
let fetchData = null
const handlePreviewData = () => {
  useFetch(
    `${config.API_URL}/page_preview/?identifier=${identifier}&token=${token}`
  ).then((res) => {
    fetchData = res.data
    previewData.value = { data: formatData(res.data), error: res.error }
    // add slug to data for the Tags pages
    previewData.value.slug = fetchData.value.meta.slug
  })
}

watch(previewData, (res) => {
  const url = new URL(previewData.value.data?.url || fetchData.value.url)
  const path = url.pathname
  switch (fetchData.value.meta.type) {
    case 'news.ArticlePage':
      return navigateTo(
        `/${previewData.value.data.section.slug}/${identifierId}?preview=true`
      )
    case 'tagpages.TagPage':
      return navigateTo(`/tags/${identifierId}?preview=true`)
    case 'gallery.GalleryPage':
      return navigateTo(`${path}?preview=true`)
    case 'standardpages.InformationPage':
      return navigateTo(`${path}?preview=true`)
    default:
      break
  }
})

handlePreviewData()
</script>

<template>
  <div>
    <div class="preview text-center bold py-8 text-5xl">
      <i
        class="pi pi-spin pi-spinner lnline-block mr-3"
        style="font-size: 2rem"
      ></i>
      <h3 class="inline-block">Building preview...</h3>
    </div>
  </div>
</template>

<style lang="scss">
.preview {
}
</style>
