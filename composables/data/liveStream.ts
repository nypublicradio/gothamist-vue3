import { useCurrentEpisodeHolder, useAllCurrentEpisodes } from '~/composables/states'
// Get a list of article pages using the Aviary /pages api
export async function getLiveStream(slug) {
    const config = useRuntimeConfig()
    const currentEpisodeHolder = useCurrentEpisodeHolder()
    const { data } = await useFetch(`${config['LIVESTREAM_URL']}?filter[slug]=${slug}&include=current-airing.image,current-show.show.image,current-episode.segments`)
    currentEpisodeHolder.value = data.value
}

export async function getAllLiveStreams() {
    const config = useRuntimeConfig()
    const allCurrentEpisodes = useAllCurrentEpisodes()
    const { data } = await useFetch(`${config['LIVESTREAM_URL']}?include=current-airing.image,current-show.show.image,current-episode.segments`)
    allCurrentEpisodes.value = data.value
}