import { useCurrentEpisode } from '~/composables/states'

// Get a list of article pages using the Aviary /pages api
export async function getLiveStream() {
    const config = useRuntimeConfig()
    const currentEpisode = useCurrentEpisode()
    const { data, error } = await useFetch(config['LIVESTREAM_URL'])
    //console.log('data = ', data.value)
    const wnycfm939Stream = data.value
    currentEpisode.value = wnycfm939Stream
}