<script setup lang="ts">
import { stringLiteral } from '@babel/types'

defineProps<{
  error: {
    url: string
    statusCode: string
    statusMessage: string
    message: string
    description: string
    data: string
  }
}>()

onMounted(() => {
  const { $analytics } = useNuxtApp()
  $analytics.sendPageView({ page_type: 'error_page' })
})
</script>
<template>
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
  <div class="error-page">
    <h1>{{ error.statusCode }} Error - {{ error.statusMessage }}</h1>
    <div v-if="$config.DEBUG === 'true'">
      <pre class="font-bold">{{ error.message }}</pre>
      <div v-html="error.description"></div>
    </div>
  </div>
</template>

<style lang="scss">
.error-page {
  .error-page-content {
    padding: 7rem;
    @include media('<md') {
      padding: 1rem;
    }
    text-align: center;
    p {
      font-size: var(--font-size-8);
    }
  }
}
</style>
