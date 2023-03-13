<script setup lang="ts">
import { ref, onMounted } from 'vue'
import TheGift from './gifts/TheGift.vue'
import { isMoreThanFrequencyHoursAgo } from '~/utilities/date'
import ProductBanner from '~~/composables/types/ProductBanner'
const props = defineProps({
  banners: {
    type: Array,
    default: () => [],
    required: true,
  },
  gaCategory: {
    type: String,
    default: 'Adhesion Modal',
  },
})
const { $analytics } = useNuxtApp()
const displayModal = ref(false)
const localStorageKey = `gothamist-marketing-modal-${props.gaCategory}`

const bannerData = ref(props.banners[0])?.value as ProductBanner
const description = bannerData.description
const bgImageId = Number(bannerData.description.replace(/(<([^>]+)>)/gi, ''))
const bgImageURL = ref(
  `url('${useImageUrl(
    { id: bgImageId },
    { width: 800, height: 800, quality: 80 }
  )}')`
)
const buttonText = ref(bannerData.buttonText)
const title = ref(bannerData.title)

const closeResponsive = () => {
  // set local storage timer
  localStorage.setItem(localStorageKey, String(Date.now()))
  displayModal.value = false
}
const onCtaClick = () => {
  //GA here
  $analytics.sendEvent('click_tracking', {
    event_category: `Click Tracking - ${props.gaCategory}`,
    component: 'modal',
    event_label: `${buttonText.value} button`,
  })
  // link here ("?utm_source=....." is added in the backend, so we don't need to add the "?" here before "utm_medium".)
  window.open(
    `${bannerData.buttonLink}utm_medium=product-marketing-banner`,
    '_blank'
  )
  displayModal.value = false
}

// lifecycle hooks
onMounted(async () => {
  //local storage check
  if (
    localStorage.getItem(localStorageKey) == null ||
    isMoreThanFrequencyHoursAgo(
      localStorage.getItem(localStorageKey),
      bannerData.frequencyInHours
    )
  ) {
    displayModal.value = true
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
        <div class="corner-burst">
          <img
            class="burst"
            src="/marketing-modal/free-burst.svg"
            alt="free burst icon"
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
              class="description my-2 md:mb-4 mb:mt-3"
            ></div>
            <TheGift />
            <Button
              class="cta-btn p-button-rounded my-4 px-4 py-3"
              :label="buttonText"
              icon="pi pi-arrow-right"
              iconPos="right"
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
  max-height: 97%;
  > div {
    background: #f3ed5a;
  }
  .p-dialog-header-icon {
    &:hover {
      background: transparent !important;
    }
  }
  .corner-burst {
    position: relative;
    .burst {
      position: absolute;
      top: 0;
      bottom: 0;
      margin: auto;
    }
  }
  .gothamist-logo {
    width: 100%;
    height: auto;
    max-width: 104px;
  }
  .p-dialog-content {
    overflow-y: auto;
    padding: 0rem 2rem 2rem 2rem;
    @include media('<md') {
      padding: 0rem 1.5rem 1.5rem 1.5rem;
    }
  }
  .white-box {
    width: 100%;
    text-align: center;
    cursor: pointer;
    .title {
      @include media('<md') {
        font-size: 1.5rem;
        line-height: normal;
      }
    }
    .description * {
      font-size: 1.8rem;
      @include media('<md') {
        font-size: 1.15rem;
      }
    }
    .p-button {
      .p-button-label {
        font-size: 1.375rem;
        @include media('<md') {
          font-size: 1rem;
        }
      }
      .p-button-icon-right {
        margin-left: 1rem;
      }
    }
  }
}
</style>
