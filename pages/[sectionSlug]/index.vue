<script setup lang="ts">
import { InformationPage } from '../../composables/types/Page'
/* preview */
import { usePreviewData } from '~/composables/states'
const previewData = usePreviewData()
const route = useRoute()
const page = await findPage(route?.params?.sectionSlug as string).then(
  ({ data }) => normalizeFindPageResponse(data)
)
const isPreview = route.query.preview ? true : false
const { $analytics } = useNuxtApp()

onMounted(() => {
  if (isPreview) {
    return
  }
  switch(page?.type) {
    case 'information_page':
      $analytics.sendPageView({
        page_type: 'information_page',
        content_group: 'static-page'
      })
      break
    case 'section_page':
      $analytics.sendPageView({
        page_type: 'section_page',
        content_group: 'section-front'
      })
      break
    default:
      break
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
