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
    default: 'Article top marketing banner',
  },
})

const { $analytics } = useNuxtApp()

const bannerData = props.data?.product_banners[0].value
const title = ref(bannerData?.title)
const description = bannerData?.description
const buttonText = ref(bannerData?.button_text)

const onCtaClick = () => {
  //GA here
  $analytics.sendEvent('click_tracking', {
    event_category: `Click Tracking - ${props.gaCategory}`,
    component: 'article top banner',
    event_label: `${buttonText.value} button`,
  })
  // link here
  window.open(bannerData?.button_link, '_blank')
}

const emit = defineEmits(['donate-click'])
</script>

<template>
  <div
    class="article-donation-marketing-bottom-CTA flex justify-content-between align-items-center gap-3 flex-column sm:flex-row"
  >
    <div class="flex flex-row justify-content-center">
      <div class="flex flex-column justify-content-center">
        <h5 class="title my-2">{{ title }}</h5>
        <div class="description">
          <p class="mb-1">Your support makes local news available to all.</p>
          <div v-html="description"></div>
          <Button
            class="flex-none cta-btn p-button-rounded px-3 py-2 mt-3"
            :label="buttonText"
            @click="onCtaClick"
          />
        </div>
      </div>
    </div>
    <div class="flex align-items-start">
      <img
        class="star mr-2"
        src="/marketing-modal/free-star.svg"
        alt="free star icon"
      />
      <ShirtsAnimation />
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
    * {
      font-family: var(--font-family-header);
      font-size: 1rem;
      line-height: normal;
    }
  }
  .cta-btn {
    height: 40px;
    .p-button-label {
      font-size: 0.85rem;
    }
  }
  .shirts {
    max-width: 150px;
  }
}
</style>
