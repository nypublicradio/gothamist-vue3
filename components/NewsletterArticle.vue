<script setup>
import { onMounted, onBeforeUnmount } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger.js'

const props = defineProps({
  triggerID: {
    type: String,
    default: '',
  },
  pinEndTriggerID: {
    type: String,
    default: '',
  },
  pinStartTopOffset: {
    type: String,
    default: '68px', // height of the header
  },
})
const newsletterElm = ref(null)
const emit = defineEmits(['submit'])

// init func for the scrollTrigger on the newsletter
const initScrollTrigger = () => {
  ScrollTrigger.create({
    trigger: `#${props.triggerID}`,
    id: 'pinnedNewsletterID',
    pin: true,
    start: `1px ${props.pinStartTopOffset}`,
    endTrigger: `#${props.pinEndTriggerID}`,
    end: `top 0%+=${newsletterElm.value.offsetHeight + 40}px`,
    //markers: true,
    pinSpacing: false,
  })
}

onMounted(() => {
  gsap.registerPlugin(ScrollTrigger)
  setTimeout(() => {
    initScrollTrigger()
  }, 1000)
})

onBeforeUnmount(() => {
  ScrollTrigger.getById('pinnedNewsletterID').kill()
})
</script>

<template>
  <div ref="newsletterElm" class="newsletter-article">
    <newsletter-home
      @submit="emit('submit')"
      small
      :showBlurb="false"
      showX
      altDesign
      outlined
      submitButtonIcon="pi-arrow-right"
    />
  </div>
</template>
