<script setup>
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger.js'
import { ref, onMounted } from 'vue'
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

const initScrollTrigger = () => {
  if (!props.hide) {
    gsapScrollTrigger = ScrollTrigger.create({
      id: 'scrollTopID',
      trigger: '#footer',
      invalidateOnRefresh: true,
      onEnter: () => {
        const btn = document.getElementById('scrollTopBtn')
        btn.classList.add('stick')
      },
      onLeaveBack: () => {
        const btn = document.getElementById('scrollTopBtn')
        btn.classList.remove('stick')
      },
      //markers: true,
    })
  }
}

watch(route, () => {
  if (!props.hide) {
    gsapScrollTrigger.refresh()
    ScrollTrigger.getById('scrollTopID').kill()
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
  &.stick {
    position: absolute;
  }
}
</style>
