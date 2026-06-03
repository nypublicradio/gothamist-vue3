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

const previewResponse = await useFetch(
    `${config.public.API_URL}/page_preview/?identifier=${identifier}&token=${token}`,
    {
      transform: (data) => {
        const transformedData = ref(transformResponseData(data))
        const normalizedData = normalizeFindPageResponse(
          transformedData,
        ) as ArticlePage
        normalizedData.meta = data.meta
        return normalizedData
      },
    },
).catch((response) => {
  if (response.error.value) {
    const { $sentry } = useNuxtApp()
    $sentry.captureException(response.error.value)
  }
  return response
})
previewData.value = toValue(previewResponse.data)

onMounted(async () => {
  const preview = previewData.value
  const url = new URL(preview.url || preview.meta?.html_url)
  const path = url.pathname
  const pageType = previewData.value?.meta.type
  switch (pageType) {
    case 'news.ArticlePage':
      await navigateTo(
        `/${preview.section.slug}/${preview.meta?.slug}?preview=true`,
        { replace: true },
      )
      break
    case 'tagpages.TagPage':
      await navigateTo(`/tags/${preview.meta?.slug}?preview=true`)
      break
    case 'gallery.GalleryPage':
      await navigateTo(`${path}?preview=true`)
      break
    case 'standardpages.InformationPage':
      await navigateTo(`${path}?preview=true`)
      break
    default:
      break
  }
})
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
