<script setup>
import { onMounted, onBeforeUnmount } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger.js'
import { useCurrentHeaderAdHeight } from '~/composables/states'

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
    default: `73px`, // height of the header
  },
})

const newsletterElm = ref(null)
const currentHeaderAdHeight = useCurrentHeaderAdHeight()
const uid = 'pinnedNewsletterID'
const emit = defineEmits(['submit'])

// init func for the scrollTrigger on the newsletter
const initScrollTrigger = () => {
  ScrollTrigger.create({
    trigger: `#${props.triggerID}`,
    id: uid,
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
  ScrollTrigger.getById(uid).kill()
})
const refreshScrollTrigger = () => {
  const scrollTriggerSelector = ScrollTrigger.getById(uid)
  if (scrollTriggerSelector) {
    scrollTriggerSelector.refresh()
  }
}
watch(currentHeaderAdHeight, (height) => {
  refreshScrollTrigger()
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
