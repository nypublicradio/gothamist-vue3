<script setup lang="ts">
  defineProps<{
    error: string
  }>()

  onMounted(() => {
    const { $analytics } = useNuxtApp()
    $analytics.sendPageView({ page_type: 'error_page' })
  })
</script>
<template>
    <Html>
      <Head>
        <Title>{{ error }} Error | Gothamist</Title>
        <Meta
          name="og:title"
          :content="`${error} Error | Gothamist`"
        />
        <Meta
          name="twitter:title"
          :content="`${error} Error | Gothamist`"
        />
      </Head>
      <div class="error-page">
      </div>
    </Html>
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
