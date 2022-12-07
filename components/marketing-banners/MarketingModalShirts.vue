<script setup>
import { ref, onMounted } from 'vue'
import ShirtsAnimation from '~/components/marketing-banners/ShirtsAnimation'
import { isMoreThanFrequencyHoursAgo } from '~/utilities/date'
const props = defineProps({
  data: {
    type: Object,
    default: null,
    required: true,
  },
  gaCategory: {
    type: String,
    default: 'Adhesion Modal',
    required: true,
  },
})
const { $analytics } = useNuxtApp()
const displayModal = ref(false)
const localStorageKey = `gothamist-marketing-modal-${props.gaCategory}`

const bannerData = props.data?.product_banners[0].value
const description = bannerData?.description

const buttonText = ref(bannerData?.button_text)
const title = ref(bannerData?.title)

const shirtsAnimationRef = ref()

const closeResponsive = () => {
  // set local storage timer
  localStorage.setItem(localStorageKey, Date.now())
  displayModal.value = false
}
const onCtaClick = () => {
  //GA here
  $analytics.sendEvent('click_tracking', {
    event_category: `Click Tracking - ${props.gaCategory}`,
    component: 'modal',
    event_label: `${buttonText.value} button`,
  })
  // link here
  window.open(bannerData?.button_link, '_blank')
  displayModal.value = false
}

// lifecycle hooks
onMounted(async () => {
  //local storage check
  if (
    localStorage.getItem(localStorageKey) == null ||
    isMoreThanFrequencyHoursAgo(
      localStorage.getItem(localStorageKey),
      bannerData?.frequency
    )
  ) {
    displayModal.value = true
    // the exposed method is not available until the next tick
    await nextTick()
    shirtsAnimationRef.value.initAnimation()
  }
})
</script>

<template>
  <div v-if="bannerData" class="marketing-modal-holder">
    <Dialog
      class="marketing-modal"
      header=" "
      v-model:visible="displayModal"
      dismissableMask
      :draggable="false"
      :modal="true"
      :breakpoints="{ '960px': '75vw', '640px': '90vw' }"
      :baseZIndex="10000"
      @hide="closeResponsive"
    >
      <template #header>
        <div class="corner-banner">
          <img
            class="banner"
            src="/marketing-modal/corner-banner.svg"
            alt="Free t-shirt corner banner"
          />
        </div>
      </template>
      <div
        class="holder flex flex-column justify-content-between align-items-center"
      >
        <div class="flex flex-column align-items-center w-auto md:w-full">
          <div
            class="white-box flex flex-column align-items-center"
            @click="onCtaClick"
          >
            <h2 class="title">
              {{ title }}
            </h2>
            <div
              v-html="description"
              class="description my-3 md:mb-4 mb:mt-3"
            ></div>
            <ShirtsAnimation ref="shirtsAnimationRef" />
            <Button
              class="cta-btn p-button-rounded my-4 md:my-5 px-4 py-3"
              :label="buttonText"
            />
            <LogoGothamist class="gothamist-logo" />
          </div>
        </div>
      </div>
    </Dialog>
  </div>
</template>

<style lang="scss">
.marketing-modal.p-dialog {
  width: 60vw;
  max-width: 800px;
  background: transparent;
  background-size: cover;
  > div {
    background: #f3ed5a;
  }
  .p-dialog-header-icon {
    &:hover {
      background: transparent !important;
    }
  }
  .corner-banner {
    .banner {
      position: absolute;
      width: 297px;
      height: auto;
      top: 0;
      left: 0;
      @include media('<md') {
        width: 200px;
      }
    }
  }
  .gothamist-logo {
    width: 100%;
    height: auto;
    max-width: 104px;
  }
  .p-dialog-content {
    overflow-y: auto;
    padding: 5rem 2rem 2rem 2rem;
    @include media('<md') {
      padding: 1rem 1.5rem 1.5rem 1.5rem;
    }
  }
  .white-box {
    width: 100%;
    text-align: center;
    cursor: pointer;
    @include media('<md') {
      padding: 1rem 0rem;
    }
    .title {
      @include media('<md') {
        font-size: 1.5rem;
        line-height: normal;
      }
    }
    .description {
      font-size: 1.75rem;
      @include media('<md') {
        font-size: 1rem;
      }
    }
  }
}
</style>
