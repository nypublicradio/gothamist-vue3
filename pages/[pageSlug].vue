<script setup lang="ts">
import { createError } from 'h3'
import { InformationPage } from '../composables/types/Page'
const route = useRoute()
const { $analytics } = useNuxtApp()

const pageSlug = route.params.pageSlug

const page = await findPage(String(pageSlug)).then(
  ({ data }) =>
    data?.value && (normalizeFindPageResponse(data) as InformationPage)
)

if (!page) {
  throw createError({ statusCode: 404, statusMessage: 'Page Not Found' })
}

onMounted(() => {
  $analytics.sendPageView({ page_type: 'information_page' })
})

const newsletterSubmitEvent = () => {
  $analytics.sendEvent('click_tracking', {
    event_category: 'Click Tracking - Footer - Newsletter',
    component: 'footer',
    event_label: 'Newsletter',
  })
}
</script>

<template>
  <div>
    <section v-if="page" class="section-page">
      <div class="content">
        <h1 class="mb-5">{{ page.title }}</h1>
        <hr class="black mb-6" />
        <!-- page content -->
        <v-streamfield
          v-if="page.body"
          :streamfield-blocks="page.body"
          class="pt-4 lg:pt-6"
        />
        <!-- newsletter -->
        <div class="mt-8 mb-5">
          <hr class="black mb-4" />
          <newsletter-home @submit="newsletterSubmitEvent" />
        </div>
      </div>
    </section>
  </div>
</template>

<style lang="scss">
.pageSlug {
  background: linear-gradient(
    180deg,
    #f3f3e4 0,
    rgba(255, 255, 255, 0) 720px,
    rgba(255, 255, 255, 0) 100%
  );
}
</style>
