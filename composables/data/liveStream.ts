import { useCurrentEpisodeHolder, useAllCurrentEpisodes } from '~/composables/states'
// Get a list of article pages using the Aviary /pages api
export async function updateLiveStream(slug:string) {
    const config = useRuntimeConfig()
    const currentEpisodeHolder = useCurrentEpisodeHolder()
    const data = await $fetch(`${config.public.LIVESTREAM_URL}?filter[slug]=${slug}&include=current-airing.image,current-show.show.image,current-episode.segments`)
    currentEpisodeHolder.value = data
}

export async function updateAllLiveStreams() {
    const config = useRuntimeConfig()
    const allCurrentEpisodes = useAllCurrentEpisodes()
    const data = await $fetch(`${config.public.LIVESTREAM_URL}?include=current-airing.image,current-show.show.image,current-episode.segments`)
    allCurrentEpisodes.value = data
}