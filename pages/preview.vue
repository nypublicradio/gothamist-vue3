<script setup lang="ts">
import { usePreviewData } from '~/composables/states'
import { normalizeFindPageResponse } from '~~/composables/data'
import type { ArticlePage } from '~~/composables/types/Page'
import { transformResponseData } from '~~/composables/useAviary'

const config = useRuntimeConfig()
const route = useRoute()
const previewData = usePreviewData()

const identifier = route.query.identifier
const token = route.query.token

function formatData(data) {
  const transformedData = transformResponseData(data)
  const normalizedData = normalizeFindPageResponse(
    transformedData,
  ) as ArticlePage
  return normalizedData
}
let fetchData = null

function handlePreviewData() {
  useFetch(
    `${config.public.API_URL}/page_preview/?identifier=${identifier}&token=${token}`,
  ).then((response) => {
    if (process.client && response.error.value) {
      const { $sentry } = useNuxtApp()
      $sentry.captureException(response.error.value)
    }
    fetchData = response.data
    previewData.value = { data: formatData(response.data), error: response.error }
    // add slug to data for the Tags pages
    previewData.value.slug = fetchData.value.meta.slug
  })
}

watch(previewData, () => {
  const url = new URL(previewData.value.data?.url || fetchData.value.url)
  const path = url.pathname
  switch (fetchData.value.meta.type) {
    case 'news.ArticlePage':
      return navigateTo(
        `/${previewData.value.data.section.slug}/${previewData.value.slug}?preview=true`,
      )
    case 'tagpages.TagPage':
      return navigateTo(`/tags/${previewData.value.slug}?preview=true`)
    case 'gallery.GalleryPage':
      return navigateTo(`${path}?preview=true`)
    case 'standardpages.InformationPage':
      return navigateTo(`${path}?preview=true`)
    default:
      break
  }
  return null
})

handlePreviewData()
</script>

<template>
  <div>
    <div class="preview text-center bold py-8 text-5xl">
      <i
        class="pi pi-spin pi-spinner lnline-block mr-3"
        style="font-size: 2rem"
      />
      <h3 class="inline-block">
        Building preview...
      </h3>
    </div>
  </div>
</template>
