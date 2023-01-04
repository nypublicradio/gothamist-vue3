<script setup lang="ts">
import { createError } from 'h3'
import { InformationPage } from '../composables/types/Page'
const route = useRoute()
const { $analytics } = useNuxtApp()

const page = await findPage('contact').then(
  ({ data }) =>
    data?.value && (normalizeFindPageResponse(data) as InformationPage)
)

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
