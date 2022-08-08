<script setup>
import { onMounted, onBeforeUnmount } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger.js'
const newsletterElm = ref(null)
const emit = defineEmits(['submit'])

// init func for the scrollTrigger on the newsletter
const initScrollTrigger = () => {
  ScrollTrigger.create({
    trigger: '#pinned-newsletter',
    id: 'pinnedNewsletterID',
    pin: true,
    start: '1px top',
    endTrigger: '#gothamist-footer',
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
    <newsletter-home @submit="emit('submit')" small :showBlurb="false" showX />
  </div>
</template>

<style lang="scss">
.newsletter-article {
}
</style>
