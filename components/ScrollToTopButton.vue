<script setup>
import { ref } from 'vue'
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

const scrollTopBtn = ref(null)

// init func for the scrollTrigger on the footer
const initScrollTrigger = () => {
  if (!props.hide) {
    gsapScrollTrigger = gsap.timeline()
    gsapScrollTrigger.to(scrollTopBtn.value, {
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
    }, 2000)
  }
})

onMounted(() => {
  gsap.registerPlugin(ScrollTrigger)
  setTimeout(() => {
    initScrollTrigger()
  }, 2000)
})

onBeforeUnmount(() => {
  gsapScrollTrigger.pause(0).kill(true)
  ScrollTrigger.getById('scrollToTopButtonID').kill(true)
  gsapScrollTrigger = null
})
</script>

<template>
  <div v-if="!hide" class="relative">
    <div ref="scrollTopBtn" class="scrollTopBtn">
      <ScrollTop
        :threshold="threshold"
        icon="pi pi-arrow-up"
        aria-label="scroll to top"
        role="button"
      />
    </div>
  </div>
</template>

<style lang="scss">
.scrollTopBtn {
  position: fixed;
  width: 68px;
  height: 68px;
  @include media('<lg') {
    width: 45px;
    height: 45px;
  }
  bottom: 20px;
  right: 20px;

  .p-scrolltop {
    position: relative;
    bottom: 0;
    right: 0;
    box-shadow: none;
    width: 68px;
    height: 68px;
    @include media('<lg') {
      width: 45px;
      height: 45px;
    }
    &.p-link {
      background: var(--button-bg);
    }
    .p-scrolltop-icon {
      font-size: 1.3rem;
      @include media('<lg') {
        font-size: 1rem;
      }
    }
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
