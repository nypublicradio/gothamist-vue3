<script setup>
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger.js'
import { onMounted, onBeforeUnmount } from 'vue'

const route = useRoute()

let gsapScrollTrigger = null
const props = defineProps({
  hide: {
    type: Boolean,
    default: false,
  },
  threshold: {
    type: Number,
    default: 600,
  },
})

// init func for the scrollTrigger on the footer
const initScrollTrigger = () => {
  if (!props.hide) {
    gsapScrollTrigger = gsap.timeline()
    gsapScrollTrigger.to('#scrollTopBtn', {
      scrollTrigger: {
        id: 'scrollToTopButtonID',
        trigger: '#gothamist-footer',
        start: '0% 100%',
        toggleActions: 'play none none reset',
        //markers: true,
      },
      position: 'absolute', // new
    })
  }
}

watch(route, () => {
  if (!props.hide) {
    gsapScrollTrigger.pause(0).kill(true)
    ScrollTrigger.getById('scrollToTopButtonID').kill(true)
    gsapScrollTrigger = null
    setTimeout(() => {
      initScrollTrigger()
    }, 1000)
  }
})

onMounted(() => {
  gsap.registerPlugin(ScrollTrigger)
  setTimeout(() => {
    initScrollTrigger()
  }, 1000)
})

onBeforeUnmount(() => {
  gsapScrollTrigger.pause(0).kill(true)
  ScrollTrigger.getById('scrollToTopButtonID').kill(true)
  gsapScrollTrigger = null
})
</script>

<template>
  <div v-if="!hide" class="relative">
    <div id="scrollTopBtn">
      <ScrollTop :threshold="threshold" icon="pi pi-arrow-up" />
    </div>
  </div>
</template>

<style lang="scss">
#scrollTopBtn {
  position: fixed;
  width: 70px;
  height: 70px;
  bottom: 20px;
  right: 20px;
  top: unset !important;
  .p-scrolltop {
    position: relative;
    bottom: 0;
    right: 0;
    animation: pScrolltopFadeInAnimation ease 1s;
    @keyframes pScrolltopFadeInAnimation {
      0% {
        opacity: 0;
      }
      100% {
        opacity: 1;
      }
    }
  }
}
</style>
