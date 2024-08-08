<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { gsap } from 'gsap'
import breakpoint from '@nypublicradio/nypr-design-system-vue3/src/assets/library/breakpoints.module.scss'
import { Draggable } from '~/assets/gsap/Draggable.js'
import { InertiaPlugin } from '~/assets/gsap/InertiaPlugin.js'

const props = defineProps<{
  items: any[]
}>()

const dragContentRef = ref(null)
const dragBoundsRef = ref(null)
const isMobile = ref(false)
const unitMinWidth = 310
const toDragWidth = ref(unitMinWidth * props.items.length)
const toDragWidthPx = ref(`${toDragWidth.value}px`)

onMounted(() => {
  // draggable setup
  if (window.innerWidth < breakpoint.xl && props.items) {
    isMobile.value = true
    setTimeout(() => {
      gsap.registerPlugin(InertiaPlugin)
      gsap.registerPlugin(Draggable)
      Draggable.create(dragContentRef.value, {
        type: 'x',
        edgeResistance: 0.45,
        bounds: dragBoundsRef.value,
        inertia: true,
      })
    }, 1000)
  }
})
onBeforeUnmount(() => {
  // kill draggable
  if (isMobile.value && dragContentRef.value)
    Draggable.get(dragContentRef.value)?.kill()
})
</script>

<template>
  <div>
    <div class="horz-scroll-holder" :class="[{ mobile: isMobile }]">
      <div ref="dragBoundsRef" class="horz-scroll">
        <div
          ref="dragContentRef"
          class="grid gutter-x-xl keep-gutter horz-scroll-content"
        >
          <div
            v-for="(item, index) in items"
            :key="item.id"
            class="flex"
            :class="
              isMobile
                ? 'col xl:col-12 xl:flex-column v-hr'
                : 'col-12 xl:col-12 flex-column xl:flex-row xl:flex-column unit'
            "
          >
            <slot :is-mobile="isMobile" :item="item" :index="index" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.horz-scroll-holder {
  // overwrite image size here from base rule for this components v-cards
  .v-card.mod-small .image-with-caption {
    width: var(--img-width-mobile) !important;
  }
  @include media('<sm') {
    .v-card.mod-small .image-with-caption {
      width: 66px !important;
    }
  }
  &.mobile {
    position: relative;
    @include media('<xl') {
      margin-left: -1.5rem;
      margin-right: -1.5rem;
      &:after {
        content: '';
        z-index: 1;
        pointer-events: none;
        position: absolute;
        top: 0;
        right: 0;
        display: block;
        height: 100%;
        width: 100%;
        background: -moz-linear-gradient(
          left,
          rgba(255, 255, 255, 1) 0%,
          rgba(255, 255, 255, 0) 5%,
          rgba(255, 255, 255, 0) 85%,
          rgba(255, 255, 255, 1) 100%
        );
        background: -webkit-linear-gradient(
          left,
          rgba(255, 255, 255, 1) 0%,
          rgba(255, 255, 255, 0) 5%,
          rgba(255, 255, 255, 0) 85%,
          rgba(255, 255, 255, 1) 100%
        );
        background: linear-gradient(
          to right,
          rgba(255, 255, 255, 1) 0%,
          rgba(255, 255, 255, 0) 5%,
          rgba(255, 255, 255, 0) 85%,
          rgba(255, 255, 255, 1) 100%
        );
      }
    }
    @include media('<md') {
      &:after {
        content: '';
        background: -moz-linear-gradient(
          left,
          rgba(255, 255, 255, 1) 0%,
          rgba(255, 255, 255, 0) 10%,
          rgba(255, 255, 255, 0) 65%,
          rgba(255, 255, 255, 1) 100%
        );
        background: -webkit-linear-gradient(
          left,
          rgba(255, 255, 255, 1) 0%,
          rgba(255, 255, 255, 0) 10%,
          rgba(255, 255, 255, 0) 65%,
          rgba(255, 255, 255, 1) 100%
        );
        background: linear-gradient(
          to right,
          rgba(255, 255, 255, 1) 0%,
          rgba(255, 255, 255, 0) 10%,
          rgba(255, 255, 255, 0) 65%,
          rgba(255, 255, 255, 1) 100%
        );
      }
    }
    .horz-scroll {
      overflow-x: hidden;
      @include media('<xl') {
        .horz-scroll-content {
          padding: 0 24px;
          //width: 1024px;
          width: v-bind(toDragWidthPx);
        }
      }
    }
    .v-hr:not(:last-child) {
      @include media('<xl') {
        border-right: 1px solid #ebebeb !important;
      }
      @include media('>=xl') {
        .v-card {
          padding-bottom: 1rem;
          border-bottom: 1px solid var(--black300);
        }
        &:last-child .v-card {
          border-bottom: none;
        }
      }
    }
  }
  .unit {
    .v-card {
      padding-bottom: 1rem;
      border-bottom: 1px solid var(--black300);
    }
    &:last-child .v-card {
      border-bottom: none;
    }
  }
}
</style>
