<script setup>
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger.js'
import { onMounted } from 'vue'

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
    gsapScrollTrigger = ScrollTrigger.create({
      id: 'scrollTopID',
      trigger: '#gothamist-footer',
      invalidateOnRefresh: true,
      onEnter: () => {
        const btn = document.getElementById('scrollTopBtn')
        if (btn) {
          btn.classList.add('stick')
        }
      },
      onLeaveBack: () => {
        const btn = document.getElementById('scrollTopBtn')
        if (btn) {
          btn.classList.remove('stick')
        }
      },
      //markers: true,
    })
  }
}

watch(route, () => {
  if (!props.hide) {
    gsapScrollTrigger.refresh()
    ScrollTrigger.getById('scrollTopID').kill()
    // not sure how to detect when a new routed page is mounted, so just using a setTimeout for now
    setTimeout(() => {
      initScrollTrigger()
    }, 1000)
  }
})

onMounted(() => {
  gsap.registerPlugin(ScrollTrigger)
  initScrollTrigger()
})
</script>

<template>
  <div v-if="!hide" class="relative">
    <ScrollTop id="scrollTopBtn" :threshold="threshold" icon="pi pi-arrow-up" />
  </div>
</template>

<style lang="scss">
.p-scrolltop {
  position: fixed;
  bottom: 20px;
  right: 20px;
  animation: pScrolltopFadeInAnimation ease 1s;
  &.stick {
    position: absolute;
  }
  @keyframes pScrolltopFadeInAnimation {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
}
</style>
