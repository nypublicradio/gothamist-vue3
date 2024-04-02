import { useAllCurrentEpisodes, useCurrentEpisodeHolder } from '~/composables/states'

// This function fetches the data for a single live stream
export async function updateLiveStream(slug: string) {
  const { $sentry } = useNuxtApp()
  const config = useRuntimeConfig()
  const currentEpisodeHolder = useCurrentEpisodeHolder()
  const data = await $fetch(`${config.public.LIVESTREAM_URL}?filter[slug]=${slug}&include=current-airing.image,current-show.show.image,current-episode.segments`)
    .catch((error) => { $sentry.captureException(error) })
  currentEpisodeHolder.value = data
}

// This function fetches the data for all live streams
export async function updateAllLiveStreams() {
  const { $sentry } = useNuxtApp()
  const config = useRuntimeConfig()
  const allCurrentEpisodes = useAllCurrentEpisodes()
  const data = await $fetch(`${config.public.LIVESTREAM_URL}?include=current-airing.image,current-show.show.image,current-episode.segments`)
    .catch((error) => { $sentry.captureException(error) })
  allCurrentEpisodes.value = data
}
