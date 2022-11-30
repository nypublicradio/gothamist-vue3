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
const localStorageKey = 'gothamist-marketing-modal-giving-tuesday'
let tl = null

const bannerData = props.data.product_banners[0].value
const bgImageId = bannerData?.description.replace(/(<([^>]+)>)/gi, '')
const bgImageURL = ref(
  `url('${useImageUrl(
    { id: bgImageId },
    { width: 800, height: 800, quality: 80 }
  )}')`
)
const buttonText = bannerData?.button_text
const title = bannerData?.title

const closeResponsive = () => {
  // set local storage timer
  localStorage.setItem(localStorageKey, Date.now())
  displayModal.value = false
}
const donating = () => {
  //GA here
  $analytics.sendEvent('click_tracking', {
    event_category: `Click Tracking - ${props.gaCategory}`,
    component: 'modal',
    event_label: `${buttonText} button`,
  })
  // link here
  window.open(bannerData?.button_link, '_blank')
  displayModal.value = false
}

const initAnimation = () => {
  setTimeout(() => {
    tl = gsap.timeline({ dekay: 0.3 })
    tl.from('.giving-tuesday-content-anim', {
      opacity: 0,
      scale: 0.8,
    }).to('.giving-tuesday-donate-btn', {
      scale: 0.95,
      yoyo: true,
      repeat: -1,
    })
  }, 10)
}

// lifecycle hooks
onMounted(() => {
  //local storage check
  if (
    localStorage.getItem(localStorageKey) == null ||
    isMoreThanFrequencyHoursAgo(
      localStorage.getItem(localStorageKey),
      bannerData?.frequency
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
          <div></div>
          <div
            class="giving-tuesday-content-anim flex flex-column align-items-center w-auto md:w-full"
          >
            <img
              class="giving-tuesday-logo"
              src="/marketing-modal/giving-tuesday.svg"
              alt="Giving Tuesday logo"
            />
            <div
              class="white-box flex flex-column align-items-center"
              @click="donating"
            >
              <h4 class="title">
                {{ title }}
              </h4>
              <Button
                class="giving-tuesday-donate-btn p-button-rounded mt-4 px-5 py-2"
                :label="buttonText"
              />
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
    padding: 0 2rem 5rem 2rem;
    @include media('<md') {
      padding: 0 1.5rem 3rem 1.5rem;
    }
    .holder {
      min-height: 550px;
      @media (max-height: 805px) {
        min-height: 68vh;
      }
    }
  }
  .giving-tuesday-logo {
    width: 100%;
    max-width: 480px;
    margin: 0px 0 2.5rem 0;
    filter: drop-shadow(5px 5px 5px rgb(0 0 0 / 0.75));
    @include media('<md') {
      margin: 0px 0 1.25rem 0;
    }
  }
  .white-box {
    background-color: #ffffffbf;
    padding: 1.5rem 2.5rem;
    border-radius: 40px;
    width: 100%;
    max-width: 450px;
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
