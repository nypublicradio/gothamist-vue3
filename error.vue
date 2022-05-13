<script setup>
const props = defineProps({
  error: {
    type: Object,
    default: null,
  },
})
</script>
<template>
    <Html>
      <Head>
        <Title>{{ error }} Error | Radiolab | WNYC Studios</Title>
        <Meta
          name="og:title"
          :content="`${error} Error | Radiolab | WNYC Studios`"
        />
        <Meta
          name="twitter:title"
          :content="`${error} Error | Radiolab | WNYC Studios`"
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
