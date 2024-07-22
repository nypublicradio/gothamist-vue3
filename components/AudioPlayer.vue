<script setup>
// had to install howler.js locally and add this import to stop it from breaking the build
// skipcq JS-0128
// eslint-disable-next-line  unused-imports/no-unused-imports
import { Howl, Howler } from 'howler'
import VPersistentPlayer from '@nypublicradio/nypr-design-system-vue3/v2/src/components/VPersistentPlayer.vue'
import {
  audioPlayerHeight,
  useCurrentEpisode,
  useIsEpisodePlaying,
  useIsPlayerMinimized,
  useTogglePlayTrigger,
} from '~/composables/states'

const { $analytics } = useNuxtApp()
const currentEpisode = useCurrentEpisode()
const isEpisodePlaying = useIsEpisodePlaying()
const togglePlayTrigger = useTogglePlayTrigger()
const isPlayerMinimized = useIsPlayerMinimized()
const showPlayer = ref(false)
const playerRef = ref()
const playerHeight = ref(`${audioPlayerHeight}px`)
/* function that updated the global useIsEpisodePlaying */
function updateUseIsEpisodePlaying(e) {
  $analytics.scheduleEvent('click_tracking', {
    event_category: 'Click Tracking - Audio Player play toggle button',
    component: 'Audio Player',
    event_label: `playing = ${e}`,
  })
  isEpisodePlaying.value = e
}
/* function that updated the global useIsPlayerMinimized */
function updateUseIsPlayerMinimized(e) {
  $analytics.scheduleEvent('click_tracking', {
    event_category: 'Click Tracking - Audio Player minimized',
    component: 'Audio Player',
    event_label: `minimized = ${e}`,
  })
  isPlayerMinimized.value = e
}

// data vars to pass to VPersistentPlayer
const currentEpisodeData = computed(
  () => currentEpisode.value.data[0].attributes,
)
const currentEpisodeImage = computed(
  () => {
    const image = currentEpisode.value.included.find(include => include.type === 'image')
    return image ? image.attributes : {}
  },
)
const currentEpisodeShow = computed(
  () => {
    const show = currentEpisode.value.included.find(include => include.type === 'show')
    return show ? show.attributes : {}
  },
)
const currentAiring = computed(
  () => {
    const airing = currentEpisode.value.included.find(include => include.type === 'airing')
    return airing ? airing.attributes : {}
  },
)
let delay = 0
// function that handles the logic for the persistent player to show and hide when the user changes the episode
function switchEpisode() {
  showPlayer.value = false
  setTimeout(() => {
    showPlayer.value = true
    delay = 1000
  }, delay)
}

watch(currentEpisode, () => {
  switchEpisode()
})

watch(togglePlayTrigger, () => {
  if (playerRef.value)
    playerRef.value.togglePlay()
})
let timer = null
let isInitialPing = true
function pingEvent() {
  const station = currentEpisodeData.value.name
  const title = currentEpisodeShow.value.title
  $analytics.scheduleEvent('event_tracking', {
    event_category: 'Ping',
    component: 'Audio Player',
    event_label: `${station} - ${title}`,
  })
}
watch(isEpisodePlaying, (e) => {
  if (isInitialPing) {
    pingEvent()
    isInitialPing = false
  }
  if (e) {
    timer = setInterval(() => {
      pingEvent()
    }, 60000)
  }
  else {
    clearInterval(timer)
    timer = null
  }
})
</script>

<template>
  <div>
    <transition name="player">
      <VPersistentPlayer
        v-if="showPlayer"
        ref="playerRef"
        class="player"
        :auto-play="true"
        :livestream="true"
        :title="currentEpisodeShow.title ?? currentAiring.title"
        :title-link="currentEpisodeShow.url"
        :station="currentEpisodeData.name"
        :description="currentEpisodeShow?.featured?.title ?? currentAiring.description"
        :image="currentEpisodeImage.url || currentEpisodeData['image-logo']"
        :file="currentEpisodeData['mobile-mp3']"
        :show-skip="false"
        :can-minimize="true"
        :show-track="false"
        @toggle-play="updateUseIsEpisodePlaying"
        @is-minimized="updateUseIsPlayerMinimized"
      />
    </transition>
  </div>
</template>

<style lang="scss">
// slide in from bottom to top
.player-enter-active {
  transition: transform calc(var(--transition-duration) * 2) ease-out;
}

.player-leave-active {
  transition: transform calc(var(--transition-duration) * 2) ease-in;
}

.player-enter-from,
.player-leave-to {
  transform: translateY(v-bind(playerHeight));
}
</style>
