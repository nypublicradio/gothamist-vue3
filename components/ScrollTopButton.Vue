<script setup>
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger.js'
import { ref, onMounted } from 'vue'

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
onMounted(() => {
  if (!props.hide) {
    gsap.registerPlugin(ScrollTrigger)
    ScrollTrigger.create({
      trigger: '#footer',
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
