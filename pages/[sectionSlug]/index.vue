<script setup lang="ts">
import { InformationPage } from '../../composables/types/Page'
/* preview */
import { usePreviewData } from '~/composables/states'
const previewData = usePreviewData()
const route = useRoute()
const isPreview = route.query.preview ? true : false
/* preview */

let page
if (isPreview)
{
  console.log(previewData)
  page = previewData.value.data
}
else  {
  page = await findPage(route?.params?.sectionSlug as string).then(
    ({ data }) => normalizeFindPageResponse(data)
  )
}
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
