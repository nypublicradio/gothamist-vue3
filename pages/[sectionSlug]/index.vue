<script setup lang="ts">
import { InformationPage } from '../../composables/types/Page'
const route = useRoute()
const page = await findPage(route?.params?.sectionSlug as string).then(
  ({ data }) => normalizeFindPageResponse(data)
)
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
