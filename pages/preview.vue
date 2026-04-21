<script setup lang="ts">
import { usePreviewData } from '~/composables/states'
import { normalizeFindPageResponse } from '~~/composables/data'
import type { ArticlePage } from '~~/composables/types/Page'
import { transformResponseData } from '~~/composables/useAviary'

const config = useRuntimeConfig()
const route = useRoute()
const previewData = usePreviewData()
const fetchData = ref()

const identifier = route.query.identifier
const token = route.query.token

previewData.value = await useFetch(
  `${config.public.API_URL}/page_preview/?identifier=${identifier}&token=${token}`,
  {
    transform: (data) => {
      fetchData.value = data
      const transformedData = ref(transformResponseData(data))
      const normalizedData = normalizeFindPageResponse(
        transformedData,
      ) as ArticlePage
      normalizedData.slug = data.meta.slug
      return normalizedData
    },
  },
).catch((response) => {
  if (process.client && response.error.value) {
    const { $sentry } = useNuxtApp()
    $sentry.captureException(response.error.value)
  }
  return response
})

const url = new URL(previewData.value.data?.url || fetchData.value.url)
const path = url.pathname
const pageType = fetchData.value?.meta.type
switch (pageType) {
  case 'news.ArticlePage':
    navigateTo(
      `/${previewData.value.data.section.slug}/${previewData.value.slug}?preview=true`,
    )
    break
  case 'tagpages.TagPage':
    navigateTo(`/tags/${previewData.value.slug}?preview=true`)
    break
  case 'gallery.GalleryPage':
    navigateTo(`${path}?preview=true`)
    break
  case 'standardpages.InformationPage':
    navigateTo(`${path}?preview=true`)
    break
  default:
    break
}
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
