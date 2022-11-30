<script setup>
import { ref, onMounted } from 'vue'
import { gsap } from 'gsap'
const config = useRuntimeConfig()
const { $analytics } = useNuxtApp()
const displayModal = ref(true)
const localStorageKey = 'gothamist-marketing-modal-giving-tuesday'
let tl = null

const {
  data: productBannerAPI,
  pending,
  error,
  refresh,
} = await useFetch(`${config.API_URL}/system_messages/2/`, {
  key: 'marketing-module',
})

console.log(
  'productBannerAPI = ',
  productBannerAPI.value.product_banners[0]?.value
)

const data = productBannerAPI.value
const bannerData = data.product_banners[0].value
const frequencyHours = Number(bannerData.frequency)

const isMoreThanFrequencyHourAgo = (date) => {
  const frequencyHrInMs = frequencyHours * 60 * 60 * 1000
  const frequencyHoursAgo = Date.now() - frequencyHrInMs
  return Number(date) < frequencyHoursAgo
}
const closeResponsive = () => {
  // set local storage timer
  localStorage.setItem(localStorageKey, Date.now())
  displayModal.value = false
}
const donating = () => {
  //GA here
  $analytics.sendEvent('click_tracking', {
    event_category: 'Click Tracking - Giving Tuesday Adhesion',
    component: 'header',
    event_label: 'Donate button',
  })
  // link here
  window.open(
    'https://pledge.wnyc.org/support/gothamist/?utm_medium=adhesion&utm_source=gothamist-dot-com&utm_campaign=giving_tuesday_adhesion',
    '_blank'
  )
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
  // check if within the time window
  if (data) {
    //local storage check
    if (
      localStorage.getItem(localStorageKey) == null ||
      isMoreThanFrequencyHourAgo(localStorage.getItem(localStorageKey))
    ) {
      displayModal.value = true
      initAnimation()
    }
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
  <div v-if="data">
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
      >
        <div
          class="holder flex flex-column justify-content-between align-items-center"
        >
          <LogoGothamist class="gothamist-logo mb-3 md:mb-5" />

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
              <h4 class="support">
                {{ bannerData?.title }}
              </h4>
              <Button
                class="giving-tuesday-donate-btn p-button-rounded mt-4 px-5 py-2"
                :label="bannerData?.button_text"
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
  background-image: url('/marketing-modal/skyline_800.webp');
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
  .p-dialog-content {
    overflow: visible;
    padding: 0 2rem 5rem 2rem;
    @include media('<md') {
      padding: 0 1.5rem 3rem 1.5rem;
    }
    .holder {
      max-height: 570px;
      min-height: 330px;
      height: 70vh;
      @include media('<md') {
        max-height: 380px;
        min-height: 300px;
      }
      .gothamist-logo {
        align-self: flex-start;
        margin-top: -50px;
        width: 100%;
        height: auto;
        max-width: 220px;
        @include media('<md') {
          max-width: 150px;
          margin-top: -60px;
        }
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
    padding: 1.5rem;
    border-radius: 40px;
    width: 100%;
    max-width: 450px;
    text-align: center;
    @include media('<md') {
      padding: 1rem;
    }
    .support {
      width: 260px;
      @include media('<md') {
        font-size: 1.5rem;
        width: 200px;
        line-height: normal;
      }
    }
    .p-button {
      background-color: #9b152b;
      .p-button-label {
        font-size: 22px;
        @include media('<md') {
          font-size: inherit;
        }
      }
    }
  }
}
</style>
