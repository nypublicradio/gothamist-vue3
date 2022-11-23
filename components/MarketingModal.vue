<script setup>
import { ref, onMounted } from 'vue'
import { gsap } from 'gsap'
const { $analytics } = useNuxtApp()
const displayModal = ref(false)
const localStorageKey = 'gothamist-marketing-modal'
const isMoreThan24HourAgo = (date) => {
  const twentyFourHrInMs = 24 * 60 * 60 * 1000
  const twentyFourHoursAgo = Date.now() - twentyFourHrInMs
  //   console.log('twentyFourHoursAgo = ', twentyFourHoursAgo)
  //   console.log('date = ', Number(date))
  //   console.log(
  //     'Number(date) < twentyFourHoursAgo = ',
  //     Number(date) < twentyFourHoursAgo
  //   )
  return Number(date) < twentyFourHoursAgo
}
const closeResponsive = () => {
  console.log('dismiss')
  // set local storage timer
  localStorage.setItem(localStorageKey, Date.now())
  displayModal.value = false
}
const donating = () => {
  //GA here
  $analytics.sendEvent('click_tracking', {
    event_category: 'Click Tracking - Giving_Tuesday_Adhesion',
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

let tl = null
const shirtAnimation = () => {
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
  if (
    localStorage.getItem(localStorageKey) == null ||
    isMoreThan24HourAgo(localStorage.getItem(localStorageKey))
  ) {
    shirtAnimation()
    displayModal.value = true
  }
})
onBeforeUnmount(() => {
  tl.pause()
  tl.kill()
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
        @hide="closeResponsive"
      >
        <LogoGothamist class="gothamist-logo mb-3 md:mb-5" />

        <div class="shirts">
          <img
            id="shirt1"
            class="shirt"
            src="/marketing-modal/shirt-gray.png"
            alt="gray shirt"
          />
          <img
            id="shirt2"
            class="shirt"
            src="/marketing-modal/shirt-red.png"
            alt="red shirt"
          />
          <img
            id="shirt3"
            class="shirt"
            src="/marketing-modal/shirt-white.png"
            alt="white shirt"
          />
          <img
            id="shirt4"
            class="shirt"
            src="/marketing-modal/shirt-green.png"
            alt="green shirt"
          />
          <img
            class="placeholder"
            src="/marketing-modal/shirt-gray.png"
            alt="gray shirt"
          />
        </div>
        <p class="text-center font-semibold my-1 md:my-4">
          Limited Edition Autumn Longsleeve
        </p>
        <h4>Get yours today!</h4>
        <Button
          class="p-button-rounded mt-4 px-5 py-3"
          label="Donate now"
          @click="donating"
        />
      </Dialog>
    </div>
  </div>
</template>

<style lang="scss">
.marketing-modal-holder {
}
.marketing-modal.p-dialog {
  width: 60vw;
  background: #56a09c;
  > div {
    background: transparent;
  }
  .p-dialog-header-icon {
    &:hover {
      background: transparent !important;
    }
  }
  .p-dialog-content {
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: visible;
    flex-direction: column;
    @include media('<md') {
      padding: 0 1rem 1.5rem 1rem;
    }
    .gothamist-logo {
      margin-top: -20px;
      width: 100%;
      height: auto;
      max-width: 400px;
      @include media('<md') {
        max-width: 200px;
      }
    }
  }

  .shirts {
    img {
      position: absolute;
      opacity: 0;
      width: 100%;
      max-width: 436px;
      &:first-child {
        opacity: 1;
      }
      &.placeholder {
        position: relative;
        opacity: 0;
      }
    }
  }
  .p-button {
    max-width: auto;
    margin: 0;
    .p-button-label {
      font-size: 22px;
      @include media('<md') {
        font-size: inherit;
      }
    }
  }
}
</style>
