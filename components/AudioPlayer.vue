<script setup>
import { ref, watch, computed } from 'vue'
import VPersistentPlayer from '@nypublicradio/nypr-design-system-vue3/v2/src/components/VPersistentPlayer.vue'
import {
  useCurrentEpisode,
  useIsEpisodePlaying,
  useTogglePlayTrigger,
  audioPlayerHeight,
} from '~/composables/states'
// had to install howler.js locally and add this import to stop it from breaking the build
import { Howl, Howler } from 'howler'
const currentEpisode = useCurrentEpisode()
const isEpisodePlaying = useIsEpisodePlaying()
const togglePlayTrigger = useTogglePlayTrigger()
const showPlayer = ref(false)
const playerRef = ref()
const playerHeight = ref(audioPlayerHeight + 'px')
console.log('playerHeight = ', playerHeight.value)
/*function that updated the global useIsEpisodePlaying */
const updateUseIsEpisodePlaying = (e) => {
  isEpisodePlaying.value = e
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
  playerRef.value.togglePlay()
})
</script>

<template>
  <div>
    <transition name="player">
      <v-persistent-player
        ref="playerRef"
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
      />
    </transition>
  </div>
</template>

<style lang="scss">
.persistent-player {
  border-top: 1px solid var(--white);
  position: fixed;
  background-color: var(--black);

  .play-button {
    background-color: var(--red);
    //border: 1px solid var(--white);
    border-radius: 50%;
    min-width: 41px !important;
    width: 41px;
    height: 41px;
    &:hover {
      border: none;
      background-color: var(--danger-light-color);
    }
    .pi-play {
      &:before {
        content: '';
        border-color: transparent transparent transparent #ffffff;
        width: 10px;
        height: 6px;
        position: relative;
        /* background: #ffffff; */
        display: block;
        box-sizing: border-box;
        border-width: 6px 0px 6px 10px;
        border-style: solid;
      }
    }
  }

  .minimize-btn {
    right: 0;
    left: 0;
    margin: auto;
  }

  * {
    color: var(--white) !important;
    :not(.pi) {
      font-family: var(--font-family-header) !important;
    }
  }
  .track-info-description {
    font-size: 0.85rem;
    opacity: 0.85;
  }
  .track-info-livestream-station {
    font-weight: normal;
  }

  .flexible-link,
  .flexible-link:not(.raw):not(.null) {
    &:hover {
      color: var(--white) !important;
    }
  }
  .track-info-livestream-indicator {
    background: var(--white) !important;
    .track-info-livestream-indicator-text {
      color: #111111 !important;
      line-height: normal;
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
  transform: translateY(v-bind(playerHeight));
}
</style>
