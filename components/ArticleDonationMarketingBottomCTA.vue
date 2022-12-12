<script setup>
import ShirtsAnimation from '~/components/marketing-banners/ShirtsAnimation'
const props = defineProps({
  data: {
    type: Object,
    default: null,
    required: true,
  },
  gaCategory: {
    type: String,
    default: 'Article bottom marketing banner',
  },
})
const emit = defineEmits(['donate-click'])
const { $analytics } = useNuxtApp()

const bannerData = ref(props.data?.product_banners[0].value)
const title = ref(bannerData.value?.title)
const description = bannerData.value?.description
const buttonText = ref(bannerData.value?.button_text)

const onCtaClick = () => {
  //GA here
  $analytics.sendEvent('click_tracking', {
    event_category: `Click Tracking - ${props.gaCategory}`,
    component: 'article top banner',
    event_label: `${buttonText.value} button`,
  })
  // link here
  window.open(bannerData.value?.button_link, '_blank')
  emit('donate-click')
}
</script>

<template>
  <div
    class="article-donation-marketing-bottom-CTA flex justify-content-between align-items-center gap-3 flex-column sm:flex-row"
  >
    <div class="flex flex-row justify-content-center">
      <div
        class="flex flex-column justify-content-center text-center sm:text-left"
      >
        <h5 class="title my-2">{{ title }}</h5>
        <div class="description">
          <p class="mb-1">Your support makes local news available to all.</p>
          <div v-html="description"></div>
          <Button
            class="flex-none cta-btn p-button-rounded px-3 py-2 mt-3 hidden sm:flex"
            :label="buttonText"
            icon="pi pi-arrow-right"
            iconPos="right"
            @click="onCtaClick"
          />
        </div>
      </div>
    </div>
    <div
      class="flex flex-none relative sm:align-items-start flex-column sm:flex-row"
    >
      <img
        class="star"
        src="/marketing-modal/free-star.svg"
        alt="free star icon"
      />
      <ShirtsAnimation />
      <Button
        class="cta-btn p-button-rounded px-3 py-2 mt-3 sm:hidden"
        :label="buttonText"
        icon="pi pi-arrow-right"
        iconPos="right"
        @click="onCtaClick"
      />
    </div>
  </div>
</template>

<style lang="scss">
.article-donation-marketing-bottom-CTA {
  background-color: var(--alert-yellow);
  padding: 20px;
  border-radius: 5px;
  margin-bottom: 2.5rem;
  @include media('<sm') {
    padding: 16px;
  }
  .gift {
    width: 56px;
    height: 56px;
  }
  .title {
    font-size: 1.5rem;
  }
  .description {
    margin-top: 5px;
    p {
      font-family: var(--font-family-header);
      font-size: 1rem;
      line-height: normal;
      @include media('<sm') {
        font-size: 14px;
      }
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
  .star {
    z-index: 2;
    @include media('<sm') {
      width: 50px;
      position: absolute;
      left: -40px;
    }
  }
  .shirts {
    max-width: 150px;
  }
}
</style>
