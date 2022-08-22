<script setup lang="ts">
import { onMounted } from 'vue'
import { useRuntimeConfig } from '#app'

const config = useRuntimeConfig()
const route = useRoute()

const props = defineProps({
  error: {
    type: Object,
    default: {},
  },
})

//console.log(props.error)

const navigation = await findNavigation().then(({ data }) =>
  normalizeFindNavigationResponse(data)
)

const { $analytics } = useNuxtApp()
onMounted(() => {
  $analytics.sendPageView({ page_type: 'error_page' })
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
  <div class="error-page">
    <Html>
      <Head>
        <Title>{{ error.statusCode }} Error | Gothamist</Title>
        <Meta
          name="og:title"
          :content="`${error.statusCode} Error | Gothamist`"
        />
        <Meta
          name="twitter:title"
          :content="`${error.statusCode} Error | Gothamist`"
        />
      </Head>
    </Html>
    <GothamistMainHeader
      :navigation="navigation"
      :showLogo="route.name !== 'index'"
      :donateUrl="config.donateUrlBase"
    />
    <main>
      <section>
        <div class="error-page-header p-6">
          <div class="error-page-error pt-2">
            {{ error.statusCode }} Error - {{ error.statusMessage }}
          </div>
          <div v-if="$config.DEBUG === 'true'" class="mt-4">
            <pre class="font-bold">{{ error.message }}</pre>
            <div v-html="error.description"></div>
          </div>
          <h2 class="text-center p-6">
            The page you're looking for doesn't appear to exist. Please check
            out our latest stories below.
          </h2>
        </div>
        <div class="content">
          <!-- featured area -->
          <article-recirculation />
          <!-- newsletter -->
          <div class="mt-8 mb-5">
            <hr class="black mb-4" />
            <newsletter-home @submit="newsletterSubmitEvent" />
          </div>
        </div>
      </section>
    </main>
    <scroll-to-top-button />
    <gothamist-footer :navigation="navigation" />
  </div>
</template>

<style lang="scss">
.error-page {
  background: linear-gradient(
    180deg,
    #f3f3e4 0,
    rgba(255, 255, 255, 0) 720px,
    rgba(255, 255, 255, 0) 100%
  );
  .error-page-header {
    background: var(--soybean200);
  }
  .error-page-error {
    font-size: var(--font-size-5);
    line-height: var(--font-size-5);
    font-weight: 400;
    text-transform: uppercase;
    text-align: left;
    border-top: solid 1px var(--black);
    font-family: var(--font-family-header);
    @include media('>lg') {
      font-size: var(--font-size-6);
      line-height: var(--font-size-6);
    }
  }
}
</style>
