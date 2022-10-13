<script setup>
import { ref, watch } from 'vue'
import VPersistentPlayer from '@nypublicradio/nypr-design-system-vue3/v2/src/components/VPersistentPlayer.vue'
import {
  useCurrentEpisode,
  useIsEpisodePlaying,
  useTogglePlayTrigger,
} from '~/composables/states'
// had to install howler.js locally and add this import to stop it from breaking the build
import { Howl, Howler } from 'howler'
const currentEpisode = useCurrentEpisode()
const isEpisodePlaying = useIsEpisodePlaying()
const togglePlayTrigger = useTogglePlayTrigger()
const showPlayer = ref(false)
const playerRef = ref()

/*function that updated the global useIsEpisodePlaying */
const updateUseIsEpisodePlaying = (e) => {
  isEpisodePlaying.value = e
}

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
  playerRef.value.togglePlay()
})
</script>

<template>
  <div>
    <transition name="player">
      <v-persistent-player
        ref="playerRef"
        v-if="showPlayer"
        :auto-play="false"
        :livestream="true"
        :title="currentEpisode.title"
        :title-link="currentEpisode.episodeLink"
        :station="currentEpisode.station"
        :description="currentEpisode.details"
        :image="currentEpisode.image"
        :file="currentEpisode.file"
        :show-skip="false"
        :can-minimize="true"
        :showTrack="false"
        @togglePlay="updateUseIsEpisodePlaying"
      />
    </transition>
  </div>
</template>

<style lang="scss">
.persistent-player {
  //border-top: 1px solid var(--blue-300);
  position: fixed;
  background-color: var(--black);

  .play-button {
    background-color: transparent;
    border: 1px solid var(--white);
  }

  * {
    color: var(--white) !important;
  }

  .flexible-link {
    &:hover {
      color: var(--white) !important;
    }
  }

  .p-slider-range {
    background: var(--red);
  }

  .maximize-btn-holder .maximize-btn.p-button {
    background-color: var(--black);
    border: 1px solid var(--black100);

    &:hover {
      background-color: var(--black100);
    }
  }

  /*   &.at-bottom {

    .maximize-btn-holder,
    .minimize-btn {
      display: none;
    }
  } */
}

// slide in from bottom to top
.player-enter-active {
  transition: transform calc(var(--transition-duration) * 2) ease-out;
}

.player-leave-active {
  transition: transform calc(var(--transition-duration) * 2) ease-in;
}

.player-enter-from,
.player-leave-to {
  transform: translateY(var(--player-height));
}
</style>
