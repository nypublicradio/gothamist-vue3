<script setup lang="ts">
const route = useRoute()
const page = await findPage(
  route?.params?.sectionSlug as string
).then(({ data }) => normalizeFindPageResponse(data))

const pageType = page.body ? 'information' : 'section'
</script>

<template>
  <div>
    <SectionPage v-if="pageType === 'section'" :page="page"/>
    <InformationPage v-if="pageType === 'information'" :page="page"/>

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
