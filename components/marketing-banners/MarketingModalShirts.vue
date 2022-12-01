<script setup>
import { ref, onMounted } from 'vue'
import { gsap } from 'gsap'
import useImageUrl from '~~/composables/useImageUrl'
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
const displayModal = ref(true)
const localStorageKey = `gothamist-marketing-modal-${props.gaCategory}`
let tl = null

const bannerData = ref(props.data.product_banners[0].value)
const bgImageId = bannerData.value.description.replace(/(<([^>]+)>)/gi, '')
const bgImageURL = ref(
  `url('${useImageUrl(
    { id: bgImageId },
    { width: 800, height: 800, quality: 80 }
  )}')`
)
const buttonText = ref(bannerData.value.button_text)
const title = ref(bannerData.value.title)

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
  window.open(bannerData.value.button_link, '_blank')
  displayModal.value = false
}

const initAnimation = () => {
  setTimeout(() => {
    tl = gsap.timeline({ repeat: -1 })
    tl.to('#shirt1', { delay: 1, opacity: 0 })
      .to('#shirt2', { opacity: 1 }, '-=0.5')
      .to('#shirt2', { delay: 1, opacity: 0 })
      .to('#shirt3', { opacity: 1 }, '-=0.5')
      .to('#shirt3', { delay: 1, opacity: 0 })
      .to('#shirt4', { opacity: 1 }, '-=0.5')
      .to('#shirt4', { delay: 1, opacity: 0 })
      .to('#shirt1', { opacity: 1 }, '-=0.5')
  }, 500)
}

// lifecycle hooks
onMounted(() => {
  //local storage check
  initAnimation()
  if (
    localStorage.getItem(localStorageKey) == null ||
    isMoreThanFrequencyHoursAgo(
      localStorage.getItem(localStorageKey),
      bannerData.value.frequency
    )
  ) {
    displayModal.value = true
    initAnimation()
  }
})
onBeforeUnmount(() => {
  if (tl) {
    tl.pause()
    tl.kill()
  }
})
</script>

<template>
  <div>
    <div class="marketing-modal-holder">
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
        :style="`background-image: ${bgImageURL};`"
      >
        <template #header>
          <LogoGothamist class="gothamist-logo" />
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
              <Button
                class="cta-btn p-button-rounded my-3 md:my-5 px-5 py-2"
                :label="buttonText"
              />
              <div class="shirts">
                <img
                  id="shirt1"
                  class="shirt"
                  src="/marketing-modal/shirt-gray.webp"
                  alt="gray shirt"
                />
                <img
                  id="shirt2"
                  class="shirt"
                  src="/marketing-modal/shirt-red.webp"
                  alt="red shirt"
                />
                <img
                  id="shirt3"
                  class="shirt"
                  src="/marketing-modal/shirt-white.webp"
                  alt="white shirt"
                />
                <img
                  id="shirt4"
                  class="shirt"
                  src="/marketing-modal/shirt-green.webp"
                  alt="green shirt"
                />
                <img
                  class="placeholder"
                  src="/marketing-modal/shirt-gray.webp"
                  alt="gray shirt"
                />
              </div>
            </div>
          </div>
        </div>
      </Dialog>
    </div>
  </div>
</template>

<style lang="scss">
.marketing-modal.p-dialog {
  width: 60vw;
  max-width: 800px;
  //background-image: url('/marketing-modal/skyline_800.webp');
  background: transparent;
  background-size: cover;
  @include media('<md') {
    background-position-x: 37%;
  }
  > div {
    background: transparent;
  }
  .p-dialog-header-icon {
    &:hover {
      background: transparent !important;
    }
  }
  .gothamist-logo {
    align-self: flex-start;
    width: 100%;
    height: auto;
    max-width: 220px;
    @include media('<md') {
      max-width: 150px;
    }
  }
  .p-dialog-content {
    overflow-y: auto;
    padding: 0 2rem 5rem 2rem;
    @include media('<md') {
      padding: 0 1.5rem 3rem 1.5rem;
    }
    .holder {
      .shirts {
        position: relative;
        -webkit-filter: drop-shadow(0px 0px 5px rgb(117, 117, 117));
        filter: drop-shadow(0px 0px 5px rgb(117, 117, 117));
        img {
          position: absolute;
          opacity: 0;
          width: 100%;
          max-width: 400px;
          &:first-child {
            opacity: 1;
          }
          &.placeholder {
            position: relative;
            opacity: 0;
          }
        }
      }
    }
  }
  .white-box {
    width: 100%;
    text-align: center;
    cursor: pointer;
    @include media('<md') {
      padding: 1rem 2rem;
    }
    .title {
      @include media('<md') {
        font-size: 1.5rem;
        line-height: normal;
      }
    }
    .p-button {
      background-color: #9b152b;
      .p-button-label {
        font-size: 2.25rem;
        @include media('<md') {
          font-size: inherit;
        }
      }
    }
  }
}
</style>
