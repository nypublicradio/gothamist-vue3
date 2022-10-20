<script setup>
import { ref, watch, computed } from 'vue'
import VPersistentPlayer from '@nypublicradio/nypr-design-system-vue3/v2/src/components/VPersistentPlayer.vue'
import {
  useCurrentEpisode,
  useIsEpisodePlaying,
  useTogglePlayTrigger,
  useIsPlayerMinimized,
  audioPlayerHeight,
} from '~/composables/states'
// had to install howler.js locally and add this import to stop it from breaking the build
import { Howl, Howler } from 'howler'
const currentEpisode = useCurrentEpisode()
const isEpisodePlaying = useIsEpisodePlaying()
const togglePlayTrigger = useTogglePlayTrigger()
const isPlayerMinimized = useIsPlayerMinimized()
const showPlayer = ref(false)
const playerRef = ref()
const playerHeight = ref(audioPlayerHeight + 'px')
/*function that updated the global useIsEpisodePlaying */
const updateUseIsEpisodePlaying = (e) => {
  isEpisodePlaying.value = e
}
/*function that updated the global useIsPlayerMinimized */
const updateUseIsPlayerMinimized = (e) => {
  isPlayerMinimized.value = e
}

// data vars to pass to VPersistentPlayer
const currentEpisodeData = computed(
  () => currentEpisode.value.data[0].attributes
)
const currentEpisodeImage = computed(
  () =>
    currentEpisode.value.included.find((include) => include.type === 'image')
      .attributes
)
const currentEpisodeShow = computed(
  () =>
    currentEpisode.value.included.find((include) => include.type === 'show')
      .attributes
)

let delay = 0
// function that handles the logic for the persistent player to show and hide when the user changes the episode
const switchEpisode = () => {
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
  if (playerRef.value) playerRef.value.togglePlay()
})
</script>

<template>
  <div>
    <transition name="player">
      <v-persistent-player
        ref="playerRef"
        class="player"
        v-if="showPlayer"
        :auto-play="true"
        :livestream="true"
        :title="currentEpisodeShow.title"
        :title-link="currentEpisodeShow.url"
        :station="currentEpisodeData.name"
        :description="currentEpisodeShow?.featured?.title"
        :image="currentEpisodeImage.url || currentEpisodeData['image-logo']"
        :file="currentEpisodeData.mp3"
        :show-skip="false"
        :can-minimize="true"
        :showTrack="false"
        @togglePlay="updateUseIsEpisodePlaying"
        @is-minimized="updateUseIsPlayerMinimized"
      />
    </transition>
  </div>
</template>

<style lang="scss">
// .persistent-player {

// }
</style>
