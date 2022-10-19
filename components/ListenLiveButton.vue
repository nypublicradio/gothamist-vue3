<script setup>
import { ref, computed, onMounted } from 'vue'
import {
  useIsEpisodePlaying,
  useTogglePlayTrigger,
  useCurrentEpisode,
} from '~/composables/states'
import { getLiveStream } from '~~/composables/data/liveStream'
const props = defineProps({
  label: {
    type: String,
    default: 'Listen Live',
  },
  slug: {
    type: String,
    default: 'wnyc-fm939',
  },
})

const emit = defineEmits(['stream-button-click'])

const isEpisodePlaying = useIsEpisodePlaying()
const togglePlayTrigger = useTogglePlayTrigger()
const currentEpisode = useCurrentEpisode()
let gotStream = false

const togglePlay = async () => {
  if (!currentEpisode.value) {
    await getLiveStream(props.slug)
  }
  emit('stream-button-click')
  togglePlayTrigger.value = !togglePlayTrigger.value
}

// lifecycle hooks
onMounted(() => {})
</script>

<template>
  <div class="listen-live-button">
    <Button
      class="p-button-rounded p-button-danger w-full flex justify-content-center"
      @click="togglePlay"
    >
      <div class="flex align-items-center">
        <img
          v-if="!isEpisodePlaying"
          alt="play icon"
          src="/play.svg"
          class="mr-2"
        />
        <img v-else alt="pause icon" src="/pause.svg" class="mr-2" />
        <img
          alt="WNYC"
          :src="`/live-stream-logos-white/${props.slug}.svg`"
          class="mr-2"
        />
        {{ props.label }}
      </div>
    </Button>
  </div>
</template>

<style lang="scss">
.listen-live-button {
}
</style>
