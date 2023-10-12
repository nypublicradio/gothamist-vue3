<script setup lang="ts">
import {
  useCurrentEpisode,
  useCurrentEpisodeHolder,
  useIsEpisodePlaying,
  useTogglePlayTrigger,
} from '~/composables/states'

defineProps({
  label: {
    type: String,
    default: 'Listen Live',
  },
  slug: {
    type: String,
    default: 'wnyc-fm939',
  },
})

const emit = defineEmits(['streamButtonClick'])

const isEpisodePlaying = useIsEpisodePlaying()
const togglePlayTrigger = useTogglePlayTrigger()
const currentEpisode = useCurrentEpisode()
const currentEpisodeHolder = useCurrentEpisodeHolder()

function togglePlay() {
  if (!currentEpisode.value)
    currentEpisode.value = currentEpisodeHolder.value

  emit('streamButtonClick')
  togglePlayTrigger.value = !togglePlayTrigger.value
}
</script>

<template>
  <div class="listen-live-button">
    <Button
      class="p-button-rounded p-button-danger w-full flex justify-content-center"
      @click="currentEpisodeHolder ? togglePlay() : null"
    >
      <div class="flex align-items-center">
        <i
          v-if="!currentEpisodeHolder"
          class="pi pi-spin pi-spinner mr-2"
          style="font-size: 1rem"
        />
        <img
          v-else-if="!isEpisodePlaying"
          alt="play icon"
          src="/play.svg"
          class="mr-2"
        >
        <img v-else alt="pause icon" src="/pause.svg" class="mr-2">
        <img
          alt="WNYC"
          :src="`/live-stream-logos-white/${slug}.svg`"
          class="mr-2"
        >
        {{ label }}
      </div>
    </Button>
  </div>
</template>
