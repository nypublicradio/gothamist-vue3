<script setup lang="ts">
import ProductBanner from '~~/composables/types/ProductBanner'
const props = defineProps({
  banners: {
    type: Array,
    default: () => [],
    required: true,
  },
  gaCategory: {
    type: String,
    default: 'Article top marketing banner',
  },
})
const emit = defineEmits(['donate-click'])
const { $analytics } = useNuxtApp()

const bannerData = ref(props.banners[0])?.value as ProductBanner
const title = ref(bannerData.title)
const description = bannerData.description
const buttonText = ref(bannerData.buttonText)

const onCtaClick = () => {
  //GA here
  $analytics.sendEvent('click_tracking', {
    event_category: `Click Tracking - ${props.gaCategory}`,
    component: 'article top banner',
    event_label: `${buttonText.value} button`,
  })
  // link here ("?utm_source=....." is added in the backend, so we don't need to add the "?" here before "utm_medium".)
  window.open(
    `${bannerData.buttonLink}&utm_medium=article-inline-top`,
    '_blank'
  )
  emit('donate-click')
}
</script>

<template>
  <div
    class="article-donation-marketing-CTA flex justify-content-between align-items-start sm:align-items-center gap-3 flex-column sm:flex-row"
    @click="onCtaClick"
  >
    <div class="flex flex-row justify-content-center">
      <img class="gift mr-2" src="/marketing-modal/gift.gif" alt="gift icon" />
      <div class="flex flex-column justify-content-center">
        <h6 class="title">{{ title }}</h6>
        <div
          class="description"
          v-html="
            `${description} <span class='cursor-pointer underline inline sm:hidden'><p>Donate now</p></span>`
          "
        ></div>
      </div>
    </div>
    <Button
      class="hidden sm:flex flex-none cta-btn p-button-rounded px-3 py-2 mx-auto sm:mx-0"
      :label="buttonText"
      icon="pi pi-arrow-right"
      iconPos="right"
    />
  </div>
</template>

<style lang="scss">
.article-donation-marketing-CTA {
  background-color: var(--alert-yellow);
  padding: 20px;
  border-radius: 5px;
  margin-bottom: 2.5rem;
  cursor: pointer;
  @include media('<sm') {
    padding-right: 1.4rem;
  }
  @include media('<xs') {
    padding-right: 1.25rem;
  }
  .gift {
    width: 56px;
    height: 56px;
  }
  .description {
    margin-top: 5px;
    p {
      font-family: var(--font-family-header);
      font-size: 0.85rem;
      line-height: normal;
      display: inline;
    }
    .inline-link {
      cursor: pointer;
      text-decoration: underline;
    }
  }
  .cta-btn {
    height: 40px;
    .p-button-label {
      font-size: 0.85rem;
    }
    .p-button-icon-right {
      margin-left: 1rem;
    }
  }
}
</style>
