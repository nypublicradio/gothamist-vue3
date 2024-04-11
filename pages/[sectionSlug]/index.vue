<script setup lang="ts">
import type { InformationPage } from '../../composables/types/Page'

/* preview */
import { usePreviewData } from '~/composables/states'
import { CacheControlAgeTime } from '~/composables/types/CacheControlAgeTime'

const previewData = usePreviewData()
const route = useRoute()
const isPreview = Boolean(route.query.preview)

const page = isPreview
  ? previewData.value.data
  : await findPage(route?.params?.sectionSlug as string).then(
    ({ data }) => normalizeFindPageResponse(data),
  ).catch(() => {
    throw createError({
      statusCode: 404,
      statusMessage: 'Page Not Found',
      fatal: true,
    })
  })

const { $analytics } = useNuxtApp()

useChartbeat()
useOptinMonster()
if (!isPreview && page)
  useCacheControlMaxAge().value = CacheControlAgeTime.FIVE_MINUTES

onMounted(() => {
  if (isPreview)
    return

  switch (page?.type) {
    case 'information_page':
      $analytics.sendPageView({
        page_type: 'information_page',
        content_group: 'static-page',
      })
      break
    case 'section_page':
      $analytics.sendPageView({
        page_type: 'section_page',
        content_group: 'section-front',
      })
      break
    default:
      throw createError({
        statusCode: 404,
        statusMessage: 'Page Not Found',
        fatal: true,
      })
  }
})
</script>

<template>
  <div>
    <SectionPageTemplate
      v-if="page?.type === 'section_page'"
      :page="page"
    />
    <InformationPageTemplate
      v-if="page?.type === 'information_page'"
      :page="page as InformationPage"
    />
  </div>
</template>

<style lang="scss">
.section-page .v-card {
  background-color: transparent;
}
.section-page .card-details {
  overflow: visible;
}
</style>
